import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../firebase/firebase";
import { useInput } from "../hooks/useInput"

/** LoginPage react component  */
export const LoginPage = () => {
    const [email, emailChange] = useInput();
    const [password, passwordChange] = useInput();
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // Handles the submit of the form
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Stops the propragation of the submit
        e.preventDefault();
        // Removes any previous error
        setError(null);
        // Tryies the login and if it fails, it sets the error
        login(email, password).catch(e => setError(e.message));
    };

    return <div className="h-screen flex flex-col container mx-auto">
        <div className="border border-white py-5 rounded-3xl w-full md:w-2/3 mx-auto px-20 my-auto">
            <h1 className="text-3xl text-center">Login</h1>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4"></div>
                <div className="md:w-3/4">
                    {error && <div className="bg-red-500 my-2 text-white p-2 rounded-3xl mx-auto w-full text-center font-bold">{error}</div>}
                </div>
            </div>
            <form className="w-full mb-2 mt-4" onSubmit={onFormSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label htmlFor="email" className="block pr-4 text-lg md:text-right mb-1 md:mb-0">Email:</label>
                    </div>
                    <div className="md:w-3/4">
                        <input type="text" onChange={emailChange} id="email" className="rounded-3xl text-black p-2 w-full leading-tight" placeholder="Email" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-2">
                    <div className="md:w-1/4">
                        <label htmlFor="email" className="block pr-4 text-lg md:text-right mb-1 md:mb-0">Password:</label>
                    </div>
                    <div className="md:w-3/4">
                        <input type="password" onChange={passwordChange} id="email" className="rounded-3xl text-black p-2 w-full leading-tight" placeholder="Password" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-2">
                    <div className="md:w-1/4"></div>
                    <div className="md:w-3/4 pl-2">
                        <div onClick={()=>navigate("/passwordReset")} className="underline underline-offset-1">Forgot password? Click here</div>
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/4"></div>
                    <div className="md:w-3/4">
                        <button className="hover:bg-white leading-tight hover:text-black border font-bold text-lg py-2 px-4 rounded-3xl w-full duration-200" type="submit" >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}