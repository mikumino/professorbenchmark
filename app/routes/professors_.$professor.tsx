import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProfessor, getProfessorClasses } from "~/utils/apiUtils";
import React, { useState, useEffect } from 'react';

export async function loader({
    params,
  }: LoaderFunctionArgs) {
    return json({
        firstname: params.professor ? params.professor.split('$')[0] : '',
        lastname: params.professor ? params.professor.split('$')[1] : ''
    });
    }

export default function Professor() {
    const [professorInfo, setProfessor] = useState<ProfessorInfo[]>([]);
    const [courses, setCourses] = useState<CourseData[]>([]);
    const data = useLoaderData<typeof loader>();

    useEffect(() => {
        const fetchProfessorAndClasses = async () => {
            setProfessor(await getProfessor(data.firstname, data.lastname));
            setCourses(await getProfessorClasses(data.firstname, data.lastname));
        };

        fetchProfessorAndClasses();
    }, []);

    return (
        <div>
            {professorInfo.map((professor, index) => {
                if(professor.AvgGPA || professor.Label === "Sen Wang") {
                    return(
                        <>
                            <h1>{professor.Label}</h1>
                            <h2>Average GPA: {professor.AvgGPA ? professor.AvgGPA.toFixed(2) : "N/A"}</h2>
                            {courses.map((course, index) => {
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


