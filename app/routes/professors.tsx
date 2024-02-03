import { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Autocomplete from "~/components/Autocomplete";

const API = "https://api.cppscheduler.com/"

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
                    <h1 className="text-4xl font-bold mb-4">Search by professor</h1>
                    <Autocomplete category="professor" />
                </div>
            </div>
        </>
    )
}