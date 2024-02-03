import { Link } from "@remix-run/react";

interface ResultRowProps {
    category: string;
    result: any;
}

export default function ResultRow(props: ResultRowProps) {
    return (
        <>
            <Link to={`/${props.category}s/${props.category === "course" ? props.result.name : (props.result.InstructorFirst + "$" + props.result.InstructorLast)}`} className="btn-ghost rounded-xl hover:cursor-pointer p-4 w-full flex flex-row items-center justify-center">
                <div className="flex flex-col text-left w-full">
                    <h1 className="text-lg font-bold">{props.category === "course" ? props.result.name : props.result.Label}</h1>
                    <p className="text-sm">{props.category === "course" ? props.result.CourseTitle : (props.result.AvgGPA ? props.result.AvgGPA.toFixed(2) : "N/A")}</p>
                </div>
            </Link>
            <div className="divider"></div>
        </>
    )
}