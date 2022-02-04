# Firebase admin server

Node server for the admin sdk to manage users and etc. on the firebase cloud.

## REQUIREMENTS
Requires the `serviceAccountKey.json` file in the main folder, you can get that file from Firebase in Settings > Service Accounts > Get a new key.

## Emulator config
If you want to run it in the emulator config set the .env parameter as follows:
`USE_EMULATORS=true`

It will set the emulators hosts to
`FIRESTORE_EMULATOR_HOST='localhost:8080'`
`FIREBASE_AUTH_EMULATOR_HOST='localhost:9099'`

## Starting the server
Just run with `node index.js`

> If you want to use a different port (default is 8888) set the environment varibale `PORT`

## Errors
It will throw an 401 (unauthorized) error if the request is from someone that isn't logged in, doesn't have the custom claim `"admin"` set to `true` or if you don't pass the `tokenId` in the header of the request (`authorization: 'Bearer ${tokenID}'` for example).

# Endpoints
### /admin/listUsers
Returns the list of the users in the Firebase Auth server in the form 
```json 
{
   "email": "string",
   "uid": "string"
}
```