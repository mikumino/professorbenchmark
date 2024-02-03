import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useMatches, useOutlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import Autocomplete from "~/components/Autocomplete";

import Stats from "~/components/Stats";
import { getProfessor } from "~/utils/apiUtils";
export async function loader({
    params,
}: LoaderFunctionArgs) {
    return json({
        firstname: params.professor1 ? params.professor1.split('$')[0] : '',
        lastname: params.professor1 ? params.professor1.split('$')[1] : ''
    });
}

export default function Column() {
    const [professorInfo, setProfessor] = useState<ProfessorInfo>();
    const data = useLoaderData<typeof loader>();
    console.log(data.firstname, data.lastname);
    const outlet = useOutlet();
    
    useEffect(() => {
        const fetchProfessor = async () => {
            setProfessor(await getProfessor(data.firstname, data.lastname));  
            console.log(professorInfo);
                      
        };

        fetchProfessor();        
    }, []);
    

    return (
        <>
            <div className="flex flex-row w-[64rem]">
                <div className="flex flex-col w-1/2 m-8 shadow-xl rounded-xl p-8">
                    {professorInfo ? <Stats professor={professorInfo} /> : <h1>Loading...</h1>}
                </div>
                {outlet || <Autocomplete category="professor" isCompare />}
            </div>
        </>
        // <h1>lol</h1>
    )
}