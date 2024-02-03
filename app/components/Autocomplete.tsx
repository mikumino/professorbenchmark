import React, { useState, useEffect } from 'react';
import ResultRow from './ResultRow';

interface Course {
    name: string;
    CourseTitle: string;
}

interface Professor {
    InstructorFirst: string,
    InstructorLast: string,
    Label: string,
    AvgGPA: number  // remember add avggpa later
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
            return ({name: course.Subject + " " + course.CourseNumber, CourseTitle: course.CourseTitle})
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
            return ({InstructorFirst: professor.InstructorFirst, InstructorLast: professor.InstructorLast, Label: professor.Label, AvgGPA: professor.AvgGPA})
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
        const currentSearchTerm = event.target.value;
        setSearchTerm(currentSearchTerm);
        if (currentSearchTerm.length > 0) {
            props.category === "course" ? filterCourses(currentSearchTerm) : filterProfessors(currentSearchTerm);
        } else {
            setSearchResults([]);
            setSearchProfs([]);
        }
    }
    
    return (
        <div className='flex flex-col items-center w-[48rem]'>
            <input className="input input-bordered mb-4" placeholder={`Select a ${props.category}`} onChange={handleInputChange}/>
            {
                props.category === "course" ?
                searchResults.map((course, index) => (
                    <ResultRow category={props.category} result={course} key={index} />
                )) :
                searchProfs.map((professor, index) => (
                    <ResultRow category={props.category} result={professor} key={index} />
                ))
            }
        </div>
    )
}