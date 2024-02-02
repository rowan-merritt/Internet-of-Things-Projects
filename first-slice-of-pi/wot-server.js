var httpServer = require('./servers/http'),
	resources = require('./resources/model');

console.log(httpServer)

// TODO 5 cont.
    // Task 4 (DONE) //
		var pirPlugin = require('./plugins/internal/pirPlugin');
		pirPlugin.start({});
		
// TODO 6 cont.
	// Task 4 (DONE) //
		var dhtPlugin = require('./plugins/internal/dhtPlugin');
		dhtPlugin.start({'frequency': 2000});
		
// // // // // // // //

var server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	// TODO 5 - Task 4 (DONE)
		pirPlugin.stop();
	// TODO 6 - Task 4 (DONE)
		dhtPlugin.stop();

	process.exit();
});
