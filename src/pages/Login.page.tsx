import { useState } from "react";
import { login } from "../firebase/firebase";
import { useAuth } from "../hooks/useAuth";
import {useInput} from "../hooks/useInput"

/** LoginPage react component  */
export const LoginPage = () => {
    const [email, emailChange] = useInput();
    const [password, passwordChange] = useInput();
    const [error, setError] = useState<string|null>(null);

    // Handles the submit of the form
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Stops the propragation of the submit
        e.preventDefault();
        // Removes any previous error
        setError(null);
        // Tryies the login and if it fails, it sets the error
        login(email,password).catch(e => setError(e.message));
    };

    return <div className="h-screen flex flex-col container mx-auto justify-center">
        {error && <div className="bg-red-500 my-2 text-white p-2 rounded-3xl mx-auto w-1/3 text-center font-bold">{error}</div>}
        <div className="border border-white py-10 rounded-3xl w-1/3 md:w-1/2 mx-auto px-20">
            <h1 className="text-3xl text-center mb-5 ">Login</h1>
            <form className="flex flex-col mx-auto" onSubmit={onFormSubmit}>
                <div className="flex">
                    <div className="flex flex-col mr-5 space-y-2">
                        <label className="text-lg py-2">Email:</label>
                        <label className="text-lg py-2">Password:</label>
                    </div>
                    <div className="flex flex-col flex-grow space-y-2 ">
                        <input type="text" name="email" id="email" onChange={emailChange} className="flex-grow rounded-3xl text-black p-2" />
                        <input type="password" name="password" id="pwd" onChange={passwordChange} className="flex-grow rounded-3xl text-black p-2" />
                    </div>
                </div>
                <input className="border border-white rounded-3xl mt-5 py-2 hover:text-black hover:bg-white duration-200" type="submit" value={"Invia"}></input>
            </form>
        </div>
    </div>
}