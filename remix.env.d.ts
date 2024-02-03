/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

interface CourseData {
    subject: string;
    number: string;
    InstructorFirst: string;
    InstructorLast: string;
    AvgGPA: number;
}

interface ProfessorInfo {
    id: number,
    InstructorFirst: string,
    InstructorLast: string,
    TotalEnrollment: number,
    AvgGPA: number,
    Label: string
}