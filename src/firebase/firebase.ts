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

const logout = () => {
    auth.signOut();
}

const getUser = () => {
    return auth.currentUser?.getIdTokenResult().then(res => {
        const out: User = {
            user_id: auth.currentUser!.uid ?? "",
            email: auth.currentUser!.email ?? "",
            name: auth.currentUser!.displayName ?? "",
            email_verified: auth.currentUser!.emailVerified,
            setup_edit: res.claims["setup-edit"] as unknown as boolean ?? false
        };
        console.log(out);
        return out;
    }).catch(err => {
        console.error(err);
        return undefined;
    })
}

const firestore = getFirestore();

/** If is running in local enviroment uses the emulator */
if(window.location.hostname === "localhost"){
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(firestore, "localhost", 8080);
}

export default getApp();
export {auth, login, logout, firestore, getUser};
