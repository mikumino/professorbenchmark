import { useEffect, useState } from "react";

interface AutocompleteProps {
    category: string
}

interface Course {
    subject: string,
    number: string
}

export default function Autocomplete(props: AutocompleteProps) {
    const [courses, setCourses] = useState<Course[]>([]);

    async function getCourses() {
        let data = await fetch("https://api.cppscheduler.com/data/courses/findAll", {
            method: "POST",
          });

        let courses = await data.json();
        courses = courses.map((course: any) => {
            return ({subject: course.Subject, number: course.CourseNumber})
        });

        setCourses(courses);
    }

    useEffect(() => {
        getCourses();
    }, []);   
    
    console.log(courses);
    

    return (
        <div className="dropdown mb-8">
            <input className="input input-bordered" placeholder={`Select a ${props.category}`}/>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
                {
                    // REALLY stupid ternary operator lol
                    props.category === "course" ?
                    courses.map((course, index) => (
                        <li key={index}>
                            <a href="#" className="hover:bg-primary-100">{course.subject} {course.number}</a>
                        </li>
                    )) :
                    // Fill with professors
                    <li>
                        <a href="#" className="hover:bg-primary-100">Professor</a>
                    </li>
                }
            </ul>
        </div>
    )
}