import { useState } from "react"
import { auth } from "../firebase/firebase";

/** Firebase authentication hook
 * @returns the uid of the current user or undefined if is not logged in
 */
export const useAuth = () => {
    const [authId, setAuthId] = useState<string | undefined>();

    auth?.onAuthStateChanged((e)=>{
        setAuthId(e?.uid);
    })

    return authId;
}