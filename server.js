var express = require("express");
var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");



var port = process.env.PORT || 8080;
app.use(bodyParser());



// Routes

// Generating token
app.get('/', function (req, res) {
	var user = {
		username:'accimeesterlin',
		age:23
	};

	jwt.sign(user, 'teachersecret', { expiresIn: '10h' }, function (err, token) {

		if(err)
			return err
		res.json({token:token});
	});
	
});

// Verifying token
app.get('/verify', function (req, res) {
	
	var token = req.param('token');

	var data = jwt.verify(token, 'secretforever', function (err, user) {
		if(err)
			res.json({token:'expire'});
		res.json({user:user});
	});

});


app.listen(port, function () {
	console.log("App is starting");
});