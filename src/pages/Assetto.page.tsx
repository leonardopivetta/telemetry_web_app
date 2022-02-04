import { Setup } from "../types/Setup"
import { useEffect, useState } from "react"
import { getSetup } from "../firebase/firestore"
import { Timestamp } from "firebase/firestore"

/**
 * @param setup
 * @returns JSX element with the render of the top view of the car for the setup
 */

const TopView: React.FC<{ setup: Setup }> = props => {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1059 752.24">
        <defs>
            <style>
                {".cls-1{fill:none}.cls-1,.cls-4{stroke:#ffe14a;stroke-miterlimit:10;stroke-width:3px}.cls-2{font-size:1rem;fill:#f6f6f6;}.cls-3{letter-spacing:-.03em}.cls-4{fill:#3c3c3b}"}
            </style>
        </defs>
        <g id="Livello_2" data-name="Livello 2">
            <g id="Livello_2-2" data-name="Livello 2">
                <image
                    width={5760}
                    height={2412}
                    transform="matrix(0 -.13 .13 0 369.72 752.24)"
                    xlinkHref={require("../assets/top_view.png")}
                />
                <path className="cls-1" d="M769.5 43.56h288v161.51h-288z" />
                <text className="cls-2" transform="translate(781.92 65.63)">
                    <tspan dy="1.2em" x={0}>{`Camber: ${props.setup.camber.frontRight}`}</tspan>
                    <tspan dy="1.2em" x={0}>{`Toe: ${props.setup.toe.frontRight}`}</tspan>
                </text>
                <path className="cls-4" d="m769.5 205.07-123.11 70.02" />
                <path className="cls-1" d="M769.5 322.92h288v161.51h-288z" />
                <text className="cls-2" transform="translate(781.92 345)">
                    <tspan dy="1.2em" x={0}>{`Camber: ${props.setup.camber.backRight}`}</tspan>
                    <tspan dy="1.2em" x={0}>{`Toe: ${props.setup.toe.backRight}`}</tspan>
                </text>
                <path className="cls-4" d="m769.5 484.43-123.11 70.02" />
                <path
                    className="cls-1"
                    transform="rotate(-180 145.5 124.315)"
                    d="M1.5 43.56h288v161.51H1.5z"
                />
                <text className="cls-2" transform="translate(11.66 65.63)">
                    <tspan dy="1.2em" x={0}>{`Camber: ${props.setup.camber.frontLeft}`}</tspan>
                    <tspan dy="1.2em" x={0}>{`Toe: ${props.setup.toe.frontLeft}`}</tspan>
                </text>
                <path className="cls-4" d="m289.5 205.07 123.11 70.02" />
                <path
                    className="cls-1"
                    transform="rotate(-180 145.5 403.675)"
                    d="M1.5 322.92h288v161.51H1.5z"
                />
                <text className="cls-2" transform="translate(11.66 345)">
                    <tspan dy="1.2em" x={0}>{`Camber: ${props.setup.camber.backLeft}`}</tspan>
                    <tspan dy="1.2em" x={0}>{`Toe: ${props.setup.toe.backLeft}`}</tspan>
                </text>
                <path className="cls-4" d="m289.5 484.43 123.11 70.02" />
            </g>
        </g>
    </svg>
}

export const AssettoPage = () => {
    const [setup, setSetup] = useState<Setup | undefined>(undefined);
    useEffect(() => {
        // Todo only debug, need to change it with a real date for the setup
        getSetup(Timestamp.fromDate(new Date())).then(setSetup);
    }, []);
    return <div className="h-screen w-screen flex flex-col">
        <div className="w-3/4 h-2/3 mx-auto">
            {setup && <TopView setup={setup} />}
        </div>
    </div>
}