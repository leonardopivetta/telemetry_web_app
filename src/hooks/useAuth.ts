import { useState } from "react"
import firebase, { auth } from "../firebase/firebase";

export const useAuth = () => {
    const [authId, setAuthId] = useState<string>("");

    auth?.onAuthStateChanged((e)=>{
        setAuthId(e?.uid ?? "");
    })

    return authId;
}