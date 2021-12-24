import {getApp, initializeApp} from 'firebase/app';
import 'firebase/auth';
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from "../firebaseConfig.json";

initializeApp(firebaseConfig);

const auth = getAuth();

if(window.location.hostname === "localhost"){
    connectAuthEmulator(auth, "http://localhost:9099");
}

const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export default getApp();
export {auth, login};
