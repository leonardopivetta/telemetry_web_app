const firebase = require("@firebase/testing")
const fs = require("fs");

const projectId = JSON.parse(fs.readFileSync("../.firebaserc", "utf-8")).projects.default

describe("Testing rules", () => {

    const authenticated = {
        uid: "simple_auth"
    }

    const admin = {
        uid: "admin_auth",
        admin: true,
    }

    const setup_edit = {
        uid: "setup_edit",
        setup_edit: true,
    }

    function getFirestore(auth){
        return firebase.initializeTestApp({projectId, auth}).firestore();
    }

    function sessionDoc(db){
        return db.collection("Sessions").doc("test_doc");
    }

    function setupsDoc(db){
        return db.collection("Setups").doc("test_doc");
    }

    it("Should allow to write docs to admin user", async () => {
        const db = getFirestore(admin);
        const sesDoc = sessionDoc(db);
        const setDoc = setupsDoc(db);
        await firebase.assertSucceeds(sesDoc.set({foo: "bar"}));
        await firebase.assertSucceeds(setDoc.set({foo: "bar"}));
    })

    it("Should not allow to write docs for simply authenticated users", async () => {
        const db = getFirestore(authenticated);
        const testDoc = sessionDoc(db);
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    });
    
    it("Should not allow access to unauthenticated users", async () => {
        const db = getFirestore();
        const testDoc = sessionDoc(db);
        await firebase.assertFails(testDoc.get());
    });

    it("Should allow to read docs for authenticated users", async () => {
        const db = getFirestore(authenticated);
        const testDoc = sessionDoc(db);
        await firebase.assertSucceeds(testDoc.get());
    });

    it("Should allow 'setup_edit' users to write in the 'Setups' colleciton", () => {
        const db = getFirestore(setup_edit);
        const testDoc = setupsDoc(db);
        return firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    })


    // eslint-disable-next-line no-undef
    after(async ()=> {
        const db = firebase.initializeAdminApp({projectId}).firestore();

        await sessionDoc(db).delete();
        await setupsDoc(db).delete();
    })
})