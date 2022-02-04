import { useState } from "react"
import { auth } from "../firebase/firebase";

/** Firebase authentication hook
 * @param onChange Will be triggered at every authState change
 * @returns the uid of the current user or undefined if is not logged in
 */
export const useAuth = (onChange?: Function) => {
    const [authId, setAuthId] = useState<string | undefined>();

    auth?.onAuthStateChanged((e)=>{
        setAuthId(e?.uid);
        // If there is an onChange function will execute it
        onChange && onChange();
    })

    return authId;
}