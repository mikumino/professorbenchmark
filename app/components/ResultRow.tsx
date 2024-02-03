interface ResultRowProps {
    category: string;
    result: any;
}

export default function ResultRow(props: ResultRowProps) {
    function handleClick() {
        console.log("clicked");
    }

    return (
        <>
            <div onClick={handleClick} className="btn-ghost rounded-xl hover:cursor-pointer p-4 w-full flex flex-row items-center justify-center">
                <div className="flex flex-col text-left w-full">
                    <h1 className="text-lg font-bold">{props.category === "course" ? props.result.name : props.result.Label}</h1>
                    <p className="text-sm">{props.category === "course" ? props.result.CourseTitle : props.result.AvgGPA}</p>
                </div>
            </div>
            <div className="divider"></div>
        </>
    )
}