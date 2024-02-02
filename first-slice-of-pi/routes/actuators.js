var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

//TODO 4
	// Task 1 //
		router.route('/').get(function (req, res, next) {
			res.send(resources.pi.sensors);
		});

		router.route('/leds').get(function(req, res, next){
			res.send(resources.pi.actuators.leds);
		});

		router.route('/leds/:id').get(function(req, res, next){
			res.send(resources.pi.actuators.leds[req.params.id]);
		});

// // // // // // // //

module.exports = router;