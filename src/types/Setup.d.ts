import { Timestamp } from "firebase/firestore";

interface TyresValues<T>{
    frontLeft: T,
    frontRight: T,
    backLeft: T,
    backRight: T,    
}

export interface Setup {
    // Timestamp of the setup update
    date: Timestamp,
    // Camber values
    camber: TyresValues<number>,
    // Toe values
    toe: TyresValues<number>,
}