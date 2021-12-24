import {getApp, initializeApp} from 'firebase/app';
import 'firebase/auth';
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from "../firebaseConfig.json";

/** Inits the app with the firebaseConfig placed in firebaseConfig.json */
initializeApp(firebaseConfig);

const auth = getAuth();

/** If is running in local enviroment uses the emulator */
if(window.location.hostname === "localhost"){
    connectAuthEmulator(auth, "http://localhost:9099");
}

/** Login function with username and password
 * @param email
 * @param password
 */
const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export default getApp();
export {auth, login};
