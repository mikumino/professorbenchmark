import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import ResultRow from "~/components/ResultRow";

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
    return json({ course: params.course });
    }

export default function Course() {
    const data = useLoaderData<typeof loader>();
    let subject = "";
    let number = "";
    if (data.course) {
        subject = data.course.split(" ")[0];
        number = data.course.split(" ")[1];
    }

    const [courseData, setCourseData] = useState<CourseData[]>([]);

    async function getCourseData() {
        const data = await fetch("https://api.cppscheduler.com/data/instructions/findByCourse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Subject: subject, CourseNumber: number})
        });

        let courses = await data.json();
        courses = courses.map((course: any) => {
            return ({subject: course.Subject, number: course.CourseNumber, InstructorFirst: course.InstructorFirst, InstructorLast: course.InstructorLast, AvgGPA: course.AvgGPA})
        });
        setCourseData(courses);
        console.log(courses);
        
    }

    useEffect(() => {
        getCourseData();
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-8">
                <h1 className="text-4xl font-bold mb-4">{subject} {number}</h1>
                {courseData.map((course, index) => {
                    console.log(course.InstructorFirst + course.InstructorLast);
                    
                    return (
                        <ResultRow key={index} category="professor" result={{InstructorFirst: course.InstructorFirst, InstructorLast: course.InstructorLast, AvgGPA: course.AvgGPA}} />
                    )
                })}
            </div>
        </>
    )
}


