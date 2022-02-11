import { addDoc, doc, getDoc, getDocs, limit, orderBy, query, Timestamp, where } from "firebase/firestore";
import { Dashboard } from "../types/Dashboard";
import { Session } from "../types/Session";
import { Setup } from "../types/Setup";
import { firestore } from "./firebase";
import { dashboardsPath, sessionsPath, setupsPath } from "./firestore_collections";

/**
 * @returns {Promise<Session[]>} The sessions from Firestore in the collection "Sessions"
 */
async function getSessions(): Promise<Array<Session>> {
    return getDocs(sessionsPath).then(querySnapshot =>{
        const sessions: Array<Session> = querySnapshot.docs.map(doc => {
            const session: Session = doc.data() as Session;
            session.id = doc.id;
            sessionStorage.setItem("session"+session.id, JSON.stringify(session));
            return session;
        });
        return sessions;
    }).catch(error => {console.error(error); return [];});
}

/**
 * @param id The id of the session to retrive from Firestore
 * @returns the session or undefined if not found
 */
async function getSession(id: string): Promise<Session | undefined> {
    const cachedSession = sessionStorage.getItem("session/"+id);
    // If there is the session already cached, returns it
    if(cachedSession){
        return Promise.resolve(JSON.parse(cachedSession) as Session);
    }
    // If there is no session cached, gets it from Firestore
    const docPath = doc(firestore, sessionsPath.path, id);
    return getDoc(docPath).then(doc => {
        if(doc.exists()){
            const session = doc.data() as Session;
            session.id = doc.id;
            sessionStorage.setItem("session/"+session.id, JSON.stringify(session));
            return session;
        }else{
            return undefined;
        }
    });
}

/**
 * @param date The date of the required setup
 * @returns the setup from Firestore in the collection "Setups" or undefined if not found
 */
async function getSetup(date: Timestamp): Promise<Setup | undefined> {
    // Gets the first setup update before the given date
    const queryLastUpdate = query(
        setupsPath, 
        where("date", "<=", date), 
        orderBy("date", "desc"),
        limit(1)
    );
    return getDocs(queryLastUpdate).then(querySnapshot => {
        // If there is no setup update before the given date, returns undefined
        if (querySnapshot.docs.length === 0) {
            return undefined;
        }
        const setup: Setup = querySnapshot.docs[0].data() as Setup;
        return setup;
    }).catch(error => {console.error(error); return undefined;});
}

/**
 * @param setup The setup to add to Firestore
 * @returns the promise of the setup added to Firestore
 */
async function pushSetup(setup: Setup): Promise<void> {
    return addDoc(setupsPath, setup).then();
}

/**
 * @returns the array of the dashboard from Firestore in the collection "Dashboards"
 */
async function getDashboards(): Promise<Array<Dashboard>>{
    // Checks if the sessions are cached
    const cachedDashboards = sessionStorage.getItem("dashboards");
    if(cachedDashboards){
        return Promise.resolve(JSON.parse(cachedDashboards) as Array<Dashboard>);
    }
    // If there are no dashboards stored in the cache gets them from Firestore
    return getDocs(dashboardsPath).then(querySnapshot => {
        const dashboards = querySnapshot.docs.map(doc => {
            return doc.data() as Dashboard;
        });
        // Sets the dashboards in the cache
        sessionStorage.setItem("dashboards", JSON.stringify(dashboards));
        return dashboards;
    }).catch(error=> {
        console.error(error);
        // Returns a session with the error as title
        return [{
            title: error,
            link: ""
        }];
    })
}

export {getSessions, getSession, getSetup, pushSetup, getDashboards};