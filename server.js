
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Configuration
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
app.use(bodyParser());


// Sign up
// Sign In
// Sign Out


// Route Security (Restricted to certain users) = API

require('./routes/routes')(app);
require('./routes/private')(app);








// Starting server
app.listen(port, () => {
    console.log("App is starting at port", port);
});






















