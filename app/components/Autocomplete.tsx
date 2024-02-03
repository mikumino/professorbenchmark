import { useEffect, useState } from "react";

interface AutocompleteProps {
    category: string
}

interface Course {
    subject: string,
    number: string
}

interface Professor {
    InstructorFirst: string,
    InstructorLast: string,
    Label: string
}

export default function Autocomplete(props: AutocompleteProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [professors, setProfessors] = useState<Professor[]>([]);

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

    async function getProfessors() {
        let data = await fetch("https://api.cppscheduler.com/data/professors/findAll", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let professors = await data.json();
        professors = professors.map((professor: any) => {
            return ({InstructorFirst: professor.InstructorFirst, InstructorLast: professor.InstructorLast, Label: professor.Label})
        });
        professors.sort((x: any, y: any) => (x.InstructorLast > y.InstructorLast) ? 1 : ((y.InstructorLast > x.InstructorLast) ? -1 : 0)); 
        setProfessors(professors);
    }

    useEffect(() => {
        //getCourses();
        getProfessors();
    }, []);   
    
    //console.log(courses);
    console.log(professors);
    

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
                    professors.map((professor, index) => (
                        <li key={index}>
                            <a href="#" className="hover:bg-primary-100">{professor.Label}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}