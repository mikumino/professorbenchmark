export default function Sidebar() {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li><a>College of Agriculture</a></li>
                <li><a>College of Business</a></li>
                <li><a>College of Education</a></li>
                <li><a>College of Engineering</a></li>
                <li><a>College of Environmental Design</a></li>
                <li><a>College of Hospitality Management</a></li>
                <li><a>College of Letters, Arts, and Social Sciences</a></li>
                <li><a>College of Science</a></li>
            </ul>  
        </div>
    </div>
    )
}