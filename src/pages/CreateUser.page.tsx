import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { adminPostRequest } from "../firebase/firebase_admin";

type Inputs = {
    email: string,
    name: string,
    password: string,
    setup_edit: boolean,
    admin: boolean,
}

export const CreateUserPage = () => {
    const {register, handleSubmit } = useForm<Inputs>();

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        adminPostRequest('user', {
            email: data.email,
            name: data.name,
            password: data.password,
            customClaims: {
                setup_edit: data.setup_edit,
                admin: data.admin
            }
        }).then(res => {
            console.log(res);
            navigate("/admin");
        }).catch(console.error);
    }

    return <div className="w-screen h-screen">
        <div className="container mx-auto h-full">
            <div className="flex">
                <div className="w-1/5"></div>
                <h1 className="text-3xl py-2">Create new user</h1>
            </div>
            <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex">
                    <label htmlFor="name" className="w-1/5 text-right pr-2 my-auto">Name: </label>
                    <input {...register("name", {required: true})} id="name" type="text" className="w-4/5 rounded-3xl text-black p-2 leading-tight"
                        placeholder="Name..."
                    />
                </div>
                <div className="w-full flex">
                    <label htmlFor="email" className="w-1/5 text-right pr-2 my-auto">Email: </label>
                    <input {...register("email", {required: true})} id="email" type="text" className="w-4/5 rounded-3xl text-black p-2 leading-tight"
                        placeholder="Email..."
                    />
                </div>
                <div className="w-full flex">
                    <label htmlFor="password" className="w-1/5 text-right pr-2 my-auto">Password: </label>
                    <input {...register("password", {required: true})} id="password" type="password" className="w-4/5 rounded-3xl text-black p-2 leading-tight"
                        placeholder="Password..."
                    />
                </div>
                <div className="w-full flex">
                    <label htmlFor="admin" className="w-1/5 text-right pr-2 my-auto">admin: </label>
                    <input {...register("admin")} id="setup_edit" type="checkbox" className="w-4/5 rounded-3xl text-black p-2 leading-tight"/>
                </div>
                <div className="w-full flex">
                    <label htmlFor="setup_edit" className="w-1/5 text-right pr-2 my-auto h-5">setup_edit: </label>
                    <input {...register("setup_edit")} id="setup_edit" type="checkbox" className="w-4/5 rounded-3xl text-black p-2 leading-tight"/>
                </div>
                <div className="w-full flex py-2">
                    <div className="w-1/5"></div>
                    <input type="submit" value="Create user" className="w-4/5 bg-yellow-400 rounded-3xl p-2 leading-tight text-black"></input>
                </div>
            </form>
        </div>
    </div>
}