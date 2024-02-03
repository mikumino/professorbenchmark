import GradeRadial from "./GradeRadial"

interface StatsProps {
    professor: ProfessorInfo

}

export default function Stats({professor}: StatsProps) {
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
        
        </div>
    )
}