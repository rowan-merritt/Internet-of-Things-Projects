var express = require('express'),
	cors = require('cors');

var actuatorRoutes = require('./../routes/actuators');
var sensorRoutes = require('./../routes/sensors');

// TODO 2 ()
	var app = express();
	app.use(cors());

	app.get('/', function(req, res){
		res.send('Some response for accessing the root');
	});

	app.get('/pi', function(req, res){
		res.send('Welcome to my pi');
	});

// TODO 4 (DONE)
	// Task 2 //
		app.use('/pi/sensors', sensorRoutes);
		app.use('/pi/actuators', actuatorRoutes);

// // // // // //

console.log(app, "any");

module.exports = app;