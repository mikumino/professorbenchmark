import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getProfessor, getProfessorClasses } from "~/utils/apiUtils";
import GradeRadial from "~/components/GradeRadial";
import React, { useState, useEffect } from 'react';
import Navbar from "~/components/Navbar";
import ResultRow from "~/components/ResultRow";

export async function loader({
    params,
  }: LoaderFunctionArgs) {
    return json({
        firstname: params.professor ? params.professor.split('$')[0] : '',
        lastname: params.professor ? params.professor.split('$')[1] : ''
    });
    }

export default function Professor() {
    const [professorInfo, setProfessor] = useState<ProfessorInfo>();
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
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-8">
                <div className="flex flex-row w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <h1 className="text-4xl font-bold mb-4 mr-4">{professorInfo ? professorInfo.InstructorFirst + " " + professorInfo.InstructorLast : ''}</h1> 
                            <Link to={professorInfo ? `/compare/${professorInfo.InstructorFirst}$${professorInfo.InstructorLast}` : '/'} className="btn bg-green-800">Compare</Link>
                        </div>
                        <h1 className="text-2xl mb-4 mr-4 items-start">{professorInfo ? "Average GPA: " + (professorInfo.AvgGPA ? professorInfo.AvgGPA.toFixed(2) : "N/A") : ''}</h1>
                    </div>
                    <div className="flex flex-col ml-8">
                        <GradeRadial grade={professorInfo ? professorInfo.AvgGPA : 0} />
                    </div>
                </div>
                {/* <h3 className="text-2xl font-bold mb-4">Average GPA: {professorInfo ? professorInfo.AvgGPA.toFixed(2) : ''}</h3> */}
                <div className="flex w-full flex-col">
                    {courses.map((course, index) => {
                        return (
                            <ResultRow link={`${course.subject}%20${course.number}`} category={`course`} headerText={`${course.subject} ${course.number}`} subtitleText={course.AvgGPA ? `GPA: ${(course.AvgGPA.toFixed(2))}` : 'N/A'} endItem={<GradeRadial grade={course.AvgGPA} />} key={index} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}


