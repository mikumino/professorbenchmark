
export default function Autocomplete() {
    return (
        <div className="dropdown mb-8">
            <input className="input input-bordered" placeholder="Select a course"/>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {/* Dynamically fill with whatever info is needed */}
            </ul>
        </div>
    )
}