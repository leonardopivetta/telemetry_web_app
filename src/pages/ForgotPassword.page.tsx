import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../firebase/firebase";

type Inputs = {
    email: string,
}

export const ForgotPasswordPage = () => {
    const { register, handleSubmit } = useForm<Inputs>({});
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = data => { 
        forgotPassword(data.email).then(()=>navigate(-1)).catch(error => alert(error.message))
    };
    return <div className="h-screen w-screen flex flex-col">
        <div className="container mx-auto my-auto">
            <div className="md:w-1/2 mx-auto">
                <div className="text-center text-xl py-2">Insert your email in the box to recive the email with the reset link:</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("email", { required: true })} className="w-full p-2 rounded-3xl leading-tight scale-98 text-black" placeholder="Email..."></input>
                    <input type="submit" value="Send" className="my-2 p-2 rounded-full border w-full scale-98 text-lg hover:scale-100 duration-200 hover:text-black hover:bg-white"></input>
                </form>
            </div>
        </div>
    </div>;
}