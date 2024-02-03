import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "ProfessorBenchmark" },
    { name: "description", content: "Compare professors" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>ProfessorBenchmark</h1>
      <p>Compare professors</p>
    </div>
  );
}
