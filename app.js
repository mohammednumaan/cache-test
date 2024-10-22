// imports
const express = require("express");
const mongoose = require("mongoose");

// initialise express app object
const app = express();

// a simple route to handle a request in the index route
app.get('/', (req, res, next) => {
    console.log("Hello!")
})

// configuring the express app to listen for
// requests in port 3000
app.listen(3000, () => {
    console.log("Listening At Port: 3000!");
})