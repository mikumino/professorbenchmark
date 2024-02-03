import { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Autocomplete from "~/components/Autocomplete";
import Stats from "~/components/Stats";
import Sidebar from "~/components/Sidebar";

export const meta: MetaFunction = () => {
    return [
      { title: "ProfessorBenchmark" },
      { name: "description", content: "Compare professors" },
    ];
};

export default function Compare() {
    return (
        <>
            <Navbar/>
            <div className="">
                <div className="gap-x-60 flex flex-row justify-center">
                    {/* <Sidebar/> */}
                    <Stats/>
                    <Stats/>
                </div>
            </div>

        </>
    )
}