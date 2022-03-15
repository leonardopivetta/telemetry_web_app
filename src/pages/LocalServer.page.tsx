import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    address: string;
}

export const LocalServerPage = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const [address, setAddress] = useState("localhost:3000");

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setAddress(data.address);
    }

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

    return <div className="w-screen h-screen">
        <div className="container mx-auto h-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="netAddress" className="w-1/5 text-right pr-2 my-auto">Network address:</label>
                <input {...register("address", { required: true })} id="netAddress" placeholder="localhost:3000" className="w-4/5 rounded-3xl text-black p-2 leading-tight" />
            </form>
            <iframe src={buildLink(address)} className="w-full h-full" title="localServer"></iframe>
        </div>
    </div>
}