const Router = require("express").Router;
const router = Router();
const checkIfAuthenticatedAndAdmin = require("./middlewares/auth-middleware").checkIfAuthenticatedAndAdmin;
const admin = require('firebase-admin')

// Main route, returns the list of the users (requires authorization and admin privileges)
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

exports.routes = router;