
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
                res.status(401).json({error:"User already exists, try again"});
            } else{
                let newUser = User({
                    username:user.username,
                    password: hash
                });

                newUser.save((err) => {
                    if(err)
                        res.status(401).json({error: "We were not able to create the user"});
                    res.status(200).json({message: "User created"});
                });
            }
        });
});


app.post('/signin', (req, res) => {

    const user = req.body;
    User.findOne({username: user.username})
        .then((currentUser) => {

            if(!bcrypt.compareSync(user.password, currentUser.password)){
                res.status(401).json({error: "Password doesn't match!"});
            }

            else{
                res.status(200).json({message:"User created!!"});
            }

        })
        .catch(() => {
            res.status(401).json({error:"No user found"});
        });
});









// Starting server
app.listen(port, () => {
    console.log("App is starting at port", port);
});






















