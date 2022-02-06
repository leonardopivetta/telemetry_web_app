import {getApp, initializeApp} from 'firebase/app';
import 'firebase/auth';
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/firestore';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig.json";
import { User } from '../types/User';

/** Inits the app with the firebaseConfig placed in firebaseConfig.json */
initializeApp(firebaseConfig);

const auth = getAuth();

/** Login function with username and password
 * @param email
 * @param password
 */
const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

/** Logut of the user from Firebase auth */
const logout = () => {
    auth.signOut();
}

/**
 * @returns {Promise<User | undefined>} the user data from Firestore Auth
 */
const getUser = async () => {
    // Gets the user claims from Firebase Auth and returns the data wrapped in the User structure
    try{
        const tokenResult = await auth.currentUser?.getIdTokenResult()
        if(tokenResult){
            const out: User = {
                user_id: auth.currentUser!.uid ?? "",
                email: auth.currentUser!.email ?? "",
                name: auth.currentUser!.displayName ?? "",
                email_verified: auth.currentUser!.emailVerified,
                customClaims: {
                    setup_edit: tokenResult.claims["setup-edit"] as unknown as boolean ?? false,
                    admin: tokenResult.claims["admin"] as unknown as boolean ?? false
                }
            };
            return out;
        }
    }catch(e){ 
        console.error(e);
        return undefined;
    };
};

const firestore = getFirestore();

/** If is running in local enviroment uses the emulator */
if(window.location.hostname === "localhost"){
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(firestore, "localhost", 8080);
}

export default getApp();
export {auth, login, logout, firestore, getUser};
