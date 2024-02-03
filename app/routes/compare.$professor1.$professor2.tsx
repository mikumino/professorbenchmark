import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Stats from "~/components/Stats";
import { getProfessor } from "~/utils/apiUtils";

export async function loader({
    params,
}: LoaderFunctionArgs) {
    return json({
        firstname: params.professor2 ? params.professor2.split('$')[0] : '',
        lastname: params.professor2 ? params.professor2.split('$')[1] : ''
    });
}

export default function Column() {
    const [professorInfo, setProfessor] = useState<ProfessorInfo>();
    const data = useLoaderData<typeof loader>();
    console.log(data.firstname, data.lastname);
    
    
    useEffect(() => {
        const fetchProfessor = async () => {
            setProfessor(await getProfessor(data.firstname, data.lastname));  
            console.log(professorInfo);
                      
        };

        fetchProfessor();        
    }, []);

    return (
        <>
            <div className="flex flex-col w-1/2 m-8">
                {professorInfo ? <Stats professor={professorInfo} /> : <h1>Loading...</h1>}
            </div>
        </>
    )
}