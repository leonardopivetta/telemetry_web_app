import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { SetupTab } from "./Dashboards.page";


type Inputs = {
    /// Network address of the local server
    address: string;
}

/**
 * @returns JSX element of the Local Server page
 */
export const LocalServerPage = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const [address, setAddress] = useState("localhost:3000");

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setAddress(data.address);
    }

    useEffect(()=> {
        const image = new Image();
        image.src = "../assets/top_view.png";
    })

    /**
     * @param address address of the local server
     * @returns The link to the local server
     */
    const buildLink = (address: string) => {
        if (!address.includes("http://")) {
            address = "http://" + address;
        }
        if(!address.includes(":")){
            address = address + ":3000";
        }
        if(window.location.href.includes(address)) return "";
        return address;
    }

    const [setup, setSetup] = useState(false);

    return <div className="w-screen h-screen">
        <div className="container mx-auto h-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex">
                <label htmlFor="netAddress" className="w-1/5 text-right pr-2 my-auto">Network address:</label>
                <input {...register("address", { required: true })} id="netAddress" placeholder="localhost:3000" className="w-4/5 rounded-3xl text-black p-2 leading-tight" />
                <button className={"px-2 flex-grow mx-2 duration-200 py-2 rounded-3xl "+ (setup ? "bg-yellow-400 text-black": "")} onClick={()=>setSetup(!setup)}>Setup</button>
            </div>
            </form>
           {!setup && <iframe src={buildLink(address)} className="w-full h-full" title="localServer"></iframe> }
           {setup && <SetupTab/>}
        </div>
    </div>
}