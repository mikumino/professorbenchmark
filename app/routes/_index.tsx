import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "ProfessorBenchmark" },
    { name: "description", content: "Compare professors" },
  ];
};

export default function Index() {
  return (
    <>
      <Navbar />
      <div className="max-3-xl flex flex-col">
        
      </div>
    </>
  );
}
