import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({
    params,
  }: LoaderFunctionArgs) {
    return json({ course: params.course });
    }

export default function Course() {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>{data.course}</h1>
        </div>
    )
}


