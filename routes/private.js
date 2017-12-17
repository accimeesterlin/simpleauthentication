
const User = require('../models/user');
const jwt = require('jsonwebtoken');


// JSON Web Token or TOKEN

// 2 methods
// .sign()   =  generating a token
// .verify() = verifying the token


// Generating 2 tokens

// On Sign up
// On Sign in


// middlewares

const authenticate = (req, res, next) => {
	let token = req.header('x-token');
	jwt.verify(token, 'whateveryyu', (err, decoded) => {
		if(err){
			res.json({error: 'You do not have access to this route'});
		} else{
			req.username = decoded.username;
			next();
		}
	});
};

module.exports = (app) => {
	app.get('/users', authenticate, (req, res) => {

		User.findOne({username: req.username })
			.select('-password')
			.then((user) => {
				console.log("User: ", user);
				res.json(user);
			})
			.catch((err) => {
				res.json(err);
			});

	});

	
};







