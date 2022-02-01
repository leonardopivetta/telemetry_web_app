import { GeoPoint, Timestamp } from "firebase/firestore";

export interface Session {
    // Id of the session
    id: string,
    // Timestamp of the start of the session
    from: Timestamp,
    // Timestamp of the end of the session
    to: Timestamp,
    // Name of the session
    name: string,
    // Number of laps
    nLaps: number,
    // Position of the session with GeoPoint
    position: GeoPoint,
}