import { Link, useLocation } from "@remix-run/react";

interface ResultRowProps {
    link: string;
    category: string;
    headerText: string;
    subtitleText: string;
    endItem: React.ReactNode;
}

export default function ResultRow(props: ResultRowProps) {
    if(props.subtitleText != 'N/A' || props.headerText === "Sen Wang"){ 
        return (
            <>
                <Link to={`${(useLocation().pathname)}/${props.link}`} className="btn-ghost rounded-xl hover:cursor-pointer p-4 w-full flex flex-row items-center justify-center">
                    <div className="flex flex-col text-left w-full">
                        <h1 className="text-lg font-bold">{props.headerText}</h1>
                        <p className="text-sm">{props.subtitleText}</p>
                    </div>
                    <div className="text-right">
                        {props.endItem}
                    </div>
                </Link>
                <div className="divider"></div>
            </>
        )
    }
}