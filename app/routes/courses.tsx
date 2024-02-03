import { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => {
    return [
      { title: "ProfessorBenchmark" },
      { name: "description", content: "Compare professors" },
    ];
};

export default function Courses() {
    return (
        <>
            <div className="">
                <Navbar />
                <div className="max-3-xl flex flex-col mt-64 items-center">
                    <h1 className="text-4xl font-bold mb-4">Search by course</h1>
                    <div className="dropdown mb-8">
                        <input className="input input-bordered" placeholder="Select a course"/>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}