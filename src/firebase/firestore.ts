import { addDoc, collection, getDocs, limit, orderBy, query, Timestamp, where } from "firebase/firestore";
import { Session } from "../types/Session";
import { Setup } from "../types/Setup";
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

/**
 * @param date The date of the required setup
 * @returns the setup from Firestore in the collection "Setups" or undefined if not found
 */
async function getSetup(date: Timestamp): Promise<Setup | undefined> {
    const setupPath = collection(firestore, "Setups");
    // Gets the first setup update before the given date
    const queryLastUpdate = query(
        setupPath, 
        where("date", "<=", date), 
        orderBy("date", "desc"),
        limit(1)
    );
    return getDocs(queryLastUpdate).then(querySnapshot => {
        // If there is no setup update before the given date, returns undefined
        if (querySnapshot.docs.length === 0) {
            return undefined;
        }
        const setup: Setup = {
            date: querySnapshot.docs[0].get("date"),
            camber: querySnapshot.docs[0].get("camber"),
            toe: querySnapshot.docs[0].get("toe")
        };
        return setup;
    }).catch(error => {console.error(error); return undefined;});
}

/**
 * @param setup The setup to add to Firestore
 * @returns the promise of the setup added to Firestore
 */
async function pushSetup(setup: Setup): Promise<void> {
    const setupPath = collection(firestore, "Setups");
    return addDoc(setupPath, setup).then();
}

export {getSessions, getSetup, pushSetup};