const express = require("express");
const app = express();
//
const marketingRoute = require("./routes/marketing_route");
const signUpRoute = require("./routes/sign_up_route");
const signInRoute = require("./routes/sign_in_route");
//
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/OfficeManagementSystem"); // will create the database OfficeManagementSystem if it is not yet there
mongoose.Promise = global.Promise; // we override the promise of mongoose with the one of the global module of Nodejs because the one of mongoose is deprecated

app.use(express.json()); // gives us a middleware that acts as a bodyParser // it enables us to only take json data
app.use("/api/marketing", marketingRoute);
app.use("/api/signup", signUpRoute);
app.use("/api/signin", signInRoute);

// use Process global object (of Node) to assign an Environment variable
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});

exports.appServer = app; // we use this for writing tests
