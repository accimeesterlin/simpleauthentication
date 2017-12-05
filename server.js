
// JSON Web Token = Secure routes API



// Authentication

// Passport

// Oauth0

// Bcrypt

// Oauth 2.0


const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


// Configuration
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
app.use(bodyParser());


// Model
const UserSchema = mongoose.Schema({
    username:{
        type:String
    },

    password:{
        type:String
    }
});

const User = mongoose.model('user', UserSchema);






// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, "signin.html"));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"));
});


// Handling Authentication
app.post('/signup', (req, res) => {
    const user = req.body; // accimeesterlin

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    console.log("Hash: ", salt);

    User.findOne({username: user.username})
        .then((currentUser) => {
            if(currentUser){
                res.redirect('/signup');
            } else{
                let newUser = User({
                    username:user.username,
                    password: hash
                });

                newUser.save((err) => {
                    if(err)
                        res.redirect('/signup');
                    res.redirect('/dashboard');
                });
            }
        });
});


app.post('/signin', (req, res) => {

    const user = req.body;
    User.findOne({username: user.username})
        .then((currentUser) => {
            console.log(currentUser.password);

            if(!currentUser){
                res.redirect('/signin');
            }

            if(!bcrypt.compareSync(user.password, currentUser.password)){
                res.redirect('/signin')
            }

            else{
                res.redirect('/dashboard');
            }

        });
});









// Starting server
app.listen(port, () => {
    console.log("App is starting at port", port);
});






















