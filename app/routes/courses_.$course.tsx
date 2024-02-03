import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getCourseData } from "~/utils/apiUtils";
import Navbar from "~/components/Navbar";
import ResultRow from "~/components/ResultRow";
import GradeRadial from "~/components/GradeRadial";

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

    useEffect(() => {
        const fetchCourseData = async () => {
            setCourseData(await getCourseData(subject, number));
        };

        fetchCourseData();
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-8">
                <h1 className="text-4xl font-bold mb-4">{subject} {number}</h1>
                {courseData.map((course, index) => {
                    return (
                        <ResultRow link={`${course.InstructorFirst}$${course.InstructorLast}`} category={`professor`} headerText={`${course.InstructorFirst} ${course.InstructorLast}`} subtitleText={course.AvgGPA ? (course.AvgGPA.toFixed(2)) : 'N/A'} endItem={<GradeRadial grade={course.AvgGPA} />} key={index} />
                    )
                })}
            </div>
        </>
    )
}


