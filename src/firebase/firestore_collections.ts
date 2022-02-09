import { collection } from "firebase/firestore";
import { firestore } from "./firebase";

const dashboardsPath = collection(firestore, "Dashboards");
const sessionsPath = collection(firestore, "Sessions");
const setupsPath = collection(firestore, "Setups");

export {dashboardsPath, sessionsPath, setupsPath};