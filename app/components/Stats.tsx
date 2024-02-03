import { useEffect, useState } from "react";
import GradeRadial from "./GradeRadial"
import { getProfessorClasses } from "~/utils/apiUtils";
import ResultRow from "./ResultRow";

interface StatsProps {
    professor: ProfessorInfo

}

export default function Stats({professor}: StatsProps) {
    const [courses, setCourses] = useState<CourseData[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            setCourses(await getProfessorClasses(professor.InstructorFirst, professor.InstructorLast));
        };

        fetchClasses();
    }, []);

    return (
        <div className="stats stats-vertical shadow text-center">
            <h1 className="text-4xl mb-4">{professor.InstructorFirst} {professor.InstructorLast}</h1>
            <div className="justify-center py-3">
                <h1 className="text-2xl mb-4">Overall</h1>
                <div className="mb-4">
                    <GradeRadial grade={professor.AvgGPA} />
                </div>
            </div> 
            <div className="stat">
                <div className="stat-title">Average GPA</div>
                <div className="stat-value">{professor.AvgGPA ? professor.AvgGPA.toFixed(2) : "N/A"}</div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Students Graded</div>
                <div className="stat-value">{professor.TotalEnrollment}</div>
                <div className="stat-desc"></div>
            </div>
            {courses.map((course, index) => {
                return (
                    <ResultRow link={`${course.subject}%20${course.number}`} category={`course`} headerText={`${course.subject} ${course.number}`} subtitleText={course.AvgGPA ? `GPA: ${(course.AvgGPA.toFixed(2))}` : 'N/A'} endItem={<GradeRadial grade={course.AvgGPA} />} key={index} />
                )
            })}
        </div>
    )
}