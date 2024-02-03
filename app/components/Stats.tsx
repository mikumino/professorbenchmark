export default function Stats(professor: ProfessorInfo) {
    return (
        <div className="stats stats-vertical shadow text-center">
            <h1 className="text-4xl">{professor.InstructorFirst} {professor.InstructorLast}</h1>
            <div className="avatar placeholder justify-center py-3">
                    <div className="radial-progress text-green-600" style={{"--value":70}} role="progressbar">
                        <span className="text-3xl">SW</span>
                    </div>
            </div> 
            <div className="stat">
                <div className="stat-title">Rating</div>
                <div className="rating flex justify-center">
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-600" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-600" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-600" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-600" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-600" />
                </div>
            </div>
            <div className="stat">
                <div className="stat-title">Average GPA</div>
                <div className="stat-value">3.5</div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Students Graded</div>
                <div className="stat-value">120</div>
                <div className="stat-desc"></div>
            </div>
        
        </div>
    )
}