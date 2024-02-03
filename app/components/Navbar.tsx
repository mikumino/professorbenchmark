export default function Navbar() {
    return (
        <div className="m-4">
            <div className="navbar bg-base-100 rounded-xl shadow-lg">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost text-xl">
                        ProfessorBenchmark 🔥
                    </a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a href="/courses" className="btn btn-ghost">
                                Courses
                            </a>
                        </li>
                        <li>
                            <a href="/professors" className="btn btn-ghost">
                                Professors
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}