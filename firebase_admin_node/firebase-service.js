const admin = require('firebase-admin');
const serviceAccountKey = require('./serviceAccountKey.json');

// If is set to true it will connect to the emulators in the default ports
const useEmulator = process.env["USE_EMULATORS"];

if(useEmulator){
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
}

// Init of the firebase app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

exports.admin = admin;