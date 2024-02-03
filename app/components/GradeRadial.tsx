export default function GradeRadial(props: { grade: number }) {
    const grade = props.grade;
    let letterGrade: string;
    let color: string;
    switch (true) {
        case grade >= 3.7:
            letterGrade = "A";
            color = "text-green-500";
            break;
        case grade >= 3.3:
            letterGrade = "B+";
            color = "text-blue-500";
            break;
        case grade >= 3.0:
            letterGrade = "B";
            color = "text-blue-500";
            break;
        case grade >= 2.7:
            letterGrade = "B-";
            color = "text-blue-500";
            break;
        case grade >= 2.3:
            letterGrade = "C+";
            color = "text-yellow-500";
            break;
        case grade >= 2.0:
            letterGrade = "C";
            color = "text-yellow-500";
            break;
        case grade >= 1.7:
            letterGrade = "C-";
            color = "text-yellow-500";
            break;
        case grade >= 1.3:
            letterGrade = "D+";
            color = "text-brown-500";
            break;
        case grade >= 0.7:
            letterGrade = "D";
            color = "text-brown-500";
            break;
        default:
            letterGrade = "F";
            color = "text-red-500";
            break;
    }

    console.log(color);
    

    return (
        <div className={`radial-progress ${color}`} style={{ "--value": `${(grade / 4) * 100}` }} role="progressbar">{letterGrade}</div>
    )
}