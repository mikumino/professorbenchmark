import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState, useEffect } from 'react';

interface ProfessorInfo {
    id: number,
    InstructorFirst: string,
    InstructorLast: string,
    TotalEnrollment: number,
    AvgGPA: number,
    Label: string
}

interface CourseData {
    subject: string;
    number: string;
    InstructorFirst: string;
    InstructorLast: string;
    AvgGPA: number;
}

export async function loader({
    params,
  }: LoaderFunctionArgs) {
    return json({
        firstname: params.professor ? params.professor.split('$')[0] : null,
        lastname: params.professor ? params.professor.split('$')[1] : null
    });
    }

export default function Professor() {
    const [professorInfo, setProfessor] = useState<ProfessorInfo[]>([]);
    const [courseData, setCourseData] = useState<CourseData[]>([]);
    const data = useLoaderData<typeof loader>();

    async function getProfessor() {
        let call = await fetch("https://api.cppscheduler.com/data/professors/find",
        {
            method: 'POST',
            body: JSON.stringify({
                InstructorFirst: data.firstname,
                InstructorLast: data.lastname
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let callResult = await call.json();
        let firstResult = await callResult;
        console.log('lol');
        
        setProfessor(firstResult);
    };

    async function getProfessorClasses() {
        let call = await fetch("https://api.cppscheduler.com/data/instructions/findByProfessor",
        {
            method: 'POST',
            body: JSON.stringify({
                InstructorFirst: data.firstname,
                InstructorLast: data.lastname
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let courses = await call.json();
        courses = courses.map((course: any) => {
            return ({subject: course.Subject, number: course.CourseNumber, InstructorFirst: course.InstructorFirst, InstructorLast: course.InstructorLast, AvgGPA: course.AvgGPA})
        });
        setCourseData(courses);
    }

    useEffect(() => {
        getProfessor();
        getProfessorClasses();
    }, []);

    return (
        <div>
            {professorInfo.map((professor, index) => {
                if(professor.AvgGPA || professor.Label === "Sen Wang") {
                    return(
                        <>
                            <h1>{professor.Label}</h1>
                            <h2>Average GPA: {professor.AvgGPA ? professor.AvgGPA.toFixed(2) : "N/A"}</h2>
                            {courseData.map((course, index) => {
                                if(course.AvgGPA) {
                                    return(
                                        <p>{course.subject} {course.number} - Avg GPA: {course.AvgGPA ? course.AvgGPA.toFixed(2) : "N/A"}</p>
                                    )
                                }
                            })}
                        </>
                    )
                }
            })}
        </div>
    )
}


