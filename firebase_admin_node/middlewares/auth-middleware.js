const admin = require('../firebase-service').admin;

// Retrives the Auth token from the request
const getAuthToken = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        req.authToken = req.headers.authorization.split(' ')[1];
    }else{
        req.authToken = null;
    }
    next();
}

// Middleware for the actual authentication and admin verification
exports.checkIfAuthenticatedAndAdmin = function checkIfAuthenticatedAndAdmin(req, res, next) {
    getAuthToken(req, res, async () => {
        try{
            const { authToken } = req;
            // Checks if the passed token is valid
            const userInfo = await admin.auth().verifyIdToken(authToken);
            // If the user doesn't have the 'admin' claim set to true it will return an error
            if(!userInfo.admin){
                res.status(401).send({error: 'Not a valid admin user'});
                return;
            }
            req.authId = userInfo.uid;
            return next();
        }catch(e){
            // If the passed token isn't valid the returns an error
            return res.status(401).send({error: 'You are not allowed 😡'})
        }
    })
};