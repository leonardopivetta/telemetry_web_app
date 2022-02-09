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
        getUser().then(setUser);
    }, [user]);
    return user;
}