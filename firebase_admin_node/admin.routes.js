const Router = require("express").Router;
const router = Router();
const checkIfAuthenticatedAndAdmin = require("./middlewares/auth-middleware").checkIfAuthenticatedAndAdmin;
const admin = require('firebase-admin')

// Returns the list of the users (requires authorization and admin privileges)
router.get('/listUsers', checkIfAuthenticatedAndAdmin, async (_, res) => {
    await admin.auth().listUsers().then(users => {
        // Array of users to return to the client
        let returnUsers = users.users.map(user => {
            return {
                email: user.email,
                uid: user.uid
            };
        });
        res.send(returnUsers);
    })
});

// Returns the information of the requested user (requires authorization and admin privileges)
router.get('/user/:uid', checkIfAuthenticatedAndAdmin, async (req, res)=> {
    const uid = req.params.uid;
    return admin.auth().getUser(uid).then(user => {
        // Return only the needed information
        const outInformation = {
            email: user.email,
            emailVerified: user.emailVerified,
            customClaims: user.customClaims,
            displayName: user.displayName
        }
        res.send(outInformation);
    });
});

// Sets the customClaims to the user with the corrisponding uid
router.post('/user/:uid/', checkIfAuthenticatedAndAdmin, async (req, res) => {
    const uid = req.params.uid;
    return admin.auth().setCustomUserClaims(uid, req.body).then(()=>res.send("done")).catch(e => res.status(400).send(e));
});

// Creates the user
router.post('/user/', checkIfAuthenticatedAndAdmin, async (req, res) => {
    const data = req.body;
    return admin.auth().createUser({
        email: data.email,
        password: data.password,
        displayName: data.name
    }).then(user => {
        return admin.auth().setCustomUserClaims(user.uid,data.customClaims).then(()=>{
            res.send("done");
        }).catch(e => res.status(400).send("failed to set customClaims: " + e));
    }).catch(e => res.status(400).send("failed to create user: " + e));
});

exports.routes = router;