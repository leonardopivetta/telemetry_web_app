# E-agle telemetry web app

This is the telemetry web app for the E-agle cars.

## Test and run locally
For the full emulation setup run `npm run emulate` (requires firebase CLI [Install instructions](https://firebase.google.com/docs/cli))

React app server: `npm run start`

Firebase admin SDK server: `node ./firebase_admin_node/index.js`

Firebase emulators: `firebase emulators:start` (requires firebase CLI [Install instructions](https://firebase.google.com/docs/cli))
> you can specify the import and export data folder with `--import=${path}` and `--export=${path}`

## Deploy
To deploy just merge into the `main` branch

## Pull requests
You can preview online the new release making a pull request to the main branch, it will create a temporary link for the preview of the site 

## Spawn servers
- Place the `.env` files in `./grafana` and `./influx` following the README in each folder
- `docker compose up`
