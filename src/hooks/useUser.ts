import { useEffect, useState } from "react";
import { getUser } from "../firebase/firebase";
import User from "../types/User";

/**
 * Firebase authentication user hook
 * @returns The user or undefined
 */
export const useUser = () => {
    const [user, setUser] = useState<User | undefined>();
    useEffect(() => {
        let isMounted = true;
        getUser().then(usr => {
            if(isMounted) setUser(usr);
        });
        return ()=>{isMounted = false}
    }, [user]);
    return user;
}