const path = require('path');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// JSON Web Token or TOKEN

// 2 methods
// .sign()   =  generating a token
// .verify() = verifying the token


// Generating 2 tokens

// On Sign up
// On Sign in






module.exports = (app) => {
	// Routes
	app.get('/', (req, res) => {
	    res.sendFile(path.join(__dirname, "/../index.html"));
	});

	app.get('/signup', (req, res) => {
	    res.sendFile(path.join(__dirname, "/../signup.html"));
	});

	app.get('/signin', (req, res) => {
	    res.sendFile(path.join(__dirname, "/../signin.html"));
	});

	app.get('/dashboard', (req, res) => {
	    res.sendFile(path.join(__dirname, "/../dashboard.html"));
	});


	// Handling Authentication
	app.post('/signup', (req, res) => {
	    const user = req.body; // accimeesterlin
	    const salt = bcrypt.genSaltSync(10);
	    const hash = bcrypt.hashSync(user.password, salt);




	    User.findOne({username: user.username})
	        .then((currentUser) => {
	            if(currentUser){
	                res.status(401).json({error:"User already exists, try again"});
	            } else{
	            	// New User Info
	                let newUser = User({
	                    username:user.username,
	                    password: hash
	                });

	                const token = jwt.sign({username: user.username}, 'whateveryyu');

	                newUser.save((err) => {
	                    if(err)
	                        res.status(401).json({error: "We were not able to create the user"});
	                    res.status(200).header('x-token', token).json({message: "User created"});
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
	            	const token = jwt.sign({username: user.username}, 'whateveryyu');
	                res.status(200).header('x-token', token).json({message:"User created!!"});
	            }

	        })
	        .catch(() => {
	            res.status(401).json({error:"No user found"});
	        });
	});
}