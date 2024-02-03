import React, { useState, useEffect } from 'react';

interface Course {
    name: string;
}

interface AutocompleteProps {
    category: string
}

export default function Autocomplete(props: AutocompleteProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchResults, setSearchResults] = useState<Course[]>([]);
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
        console.log('ran')
        setCourses(courses);
    }

    useEffect(() => {
        getCourses();
    }, []);

    const filterCourses = (searchTerm: string) => {
        const results = courses.filter(course => 
            course.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        setSearchResults(results);
    }

    const filterProfessors = (searchTerm: string) => {
        // Fill with professors
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (searchTerm.length > 1) {
            props.category === "course" ? filterCourses(searchTerm) : filterProfessors(searchTerm);
        }
    }
    
    return (
        <div className="dropdown mb-8">
            <input className="input input-bordered" placeholder={`Select a ${props.category}`} onChange={handleInputChange}/>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
                {
                    props.category === "course" ?
                    searchResults.map((course, index) => (
                        <li key={index}>
                            <a href="#" className="hover:bg-primary-100">{course.name}</a>
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