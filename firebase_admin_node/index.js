const express = require('express');
const app = express();
const cors = require("cors");
// Definition of the port
const port = process.env.PORT || 8888;

const adminRoutes = require('./admin.routes').routes;

// Cors enable
app.use(cors());

// Routes defined in the router file
app.use("/admin/", adminRoutes);

// Server listen on the port defined by the env or the upper definition
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
