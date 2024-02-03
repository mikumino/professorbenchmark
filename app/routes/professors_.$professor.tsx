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

        setProfessor(firstResult);
    };

    useEffect(() => {
        getProfessor();
    });

    return (
        <div>
            {professorInfo.map((professor, index) => {
                if(professor.AvgGPA || professor.Label === "Sen Wang") {
                    return(
                        <>
                            <h1>{professor.Label}</h1>
                            <h2>Average GPA: {professor.AvgGPA ? professor.AvgGPA.toFixed(2) : "N/A"}</h2>
                        </>
                    )
                }
            })}
        </div>
    )
}


