import React, { useState, useEffect } from 'react';

interface Course {
    name: string;
}

interface Professor {
    InstructorFirst: string,
    InstructorLast: string,
    Label: string
}

interface AutocompleteProps {
    category: string
}

export default function Autocomplete(props: AutocompleteProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [searchProfs, setSearchProfs] = useState<Professor[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function getCourses() {
        let data = await fetch("https://api.cppscheduler.com/data/courses/findAll", {
            method: "POST",
        });

        let courses = await data.json();
        courses = courses.map((course: any) => {
            let name = course.Subject + " " + course.CourseNumber
            return ({name: name})
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
        props.category === "course" ? getCourses() : getProfessors();
    }, []);

    const filterCourses = (searchTerm: string) => {
        const results = courses.filter(course => 
            course.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        setSearchResults(results);
    }

    const filterProfessors = (searchTerm: string) => {
        const results = professors.filter(course => 
            course.Label.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        setSearchProfs(results);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (searchTerm.length > 0) {
            props.category === "course" ? filterCourses(searchTerm) : filterProfessors(searchTerm);
        }
    }
    
    return (
        <div className="dropdown mb-8">
            <input className="input input-bordered" placeholder={`Select a ${props.category}`} onChange={handleInputChange}/>
            <ul tabIndex={0} className={`${(props.category === "course" ? searchResults.length : searchProfs.length) === 0 ? 'hidden' : 'display' } dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto`}>
                {
                    props.category === "course" ?
                    searchResults.map((course, index) => (
                        <li key={index}>
                            <a href="#" className="hover:bg-primary-100">{course.name}</a>
                        </li>
                    )) :
                    // Fill with professors
                    searchProfs.map((professor, index) => (
                        <li key={index}>
                            <a href="#" className="hover:bg-primary-100">{professor.Label}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}