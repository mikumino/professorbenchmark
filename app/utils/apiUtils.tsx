// Professor
export async function getProfessor(firstname: string, lastname: string) {
    const data = await fetch("https://api.cppscheduler.com/data/professors/find",
    {
        method: 'POST',
        body: JSON.stringify({
            InstructorFirst: firstname,
            InstructorLast: lastname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const professor = await data.json();
    return professor[0];
}

export async function getProfessorClasses(firstname: string, lastname: string) {
    const data = await fetch("https://api.cppscheduler.com/data/instructions/findByProfessor",
    {
        method: 'POST',
        body: JSON.stringify({
            InstructorFirst: firstname,
            InstructorLast: lastname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let courses = await data.json();
    courses = courses.map((course: any) => {
        return ({subject: course.Subject, number: course.CourseNumber, InstructorFirst: course.InstructorFirst, InstructorLast: course.InstructorLast, AvgGPA: course.AvgGPA})
    });
    return courses;
}

// Course
export async function getCourseData(subject: string, number: string) {
    const data = await fetch("https://api.cppscheduler.com/data/instructions/findByCourse",
    {
        method: 'POST',
        body: JSON.stringify({
            Subject: subject,
            CourseNumber: number
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let courses = await data.json();
    courses = courses.map((course: any) => {
        return ({subject: course.Subject, number: course.CourseNumber, InstructorFirst: course.InstructorFirst, InstructorLast: course.InstructorLast, AvgGPA: course.AvgGPA})
    });
    return courses;
}