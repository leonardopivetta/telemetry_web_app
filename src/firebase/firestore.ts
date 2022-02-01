import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { Session } from "../types/Session";
import { firestore } from "./firebase";

/**
 * @returns {Promise<Session[]>} The sessions from Firestore in the collection "Sessions"
 */
async function getSessions(): Promise<Array<Session>> {
    const sessionsPath = collection(firestore, "Sessions");
    return getDocs(sessionsPath).then(querySnapshot =>{
        const sessions: Array<Session> = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                from: doc.get("from"),
                to: doc.get("to"),
                name: doc.get("name"),
                nLaps: doc.get("nLaps"),
                position: doc.get("position")
            };
        });
        return sessions;
    }).catch(error => {console.error(error); return [];});
}


export {getSessions};