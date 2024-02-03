import { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Autocomplete from "~/components/Autocomplete";

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
                <div className="max-3-xl flex flex-col mt-8 items-center">
                    <h1 className="text-4xl font-bold mb-4">Search by course</h1>
                    <Autocomplete category="course" />
                </div>
            </div>
        </>
    )
}