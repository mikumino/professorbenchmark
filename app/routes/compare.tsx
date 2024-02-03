import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Stats from "~/components/Stats";

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
                    <Outlet />
                </div>
            </div>

        </>
    )
}