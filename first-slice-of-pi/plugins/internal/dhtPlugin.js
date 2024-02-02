var resources = require('./../../resources/model');
var sensorDriver = require('node-dht-sensor');

var interval, sensor;
var device = resources.pi.sensors.dht;
var localParams = {'frequency': 2000};

// TODO 6
    // Task 1 (DONE)
        function connectHardware() {
            sensorDriver.initialize(device.model, device.gpio)

            function read (){
                var readout = sensorDriver.read()
            
                device.temperature.value = parseFloat(readout.temperature);
                device.humidity.value = parseFloat(readout.humidity);
            }

            read();

            interval = setInterval(function () {
                read();
            }, localParams.frequency);
        }
    
    // Task 2 (DONE)
        function start(params) {
            localParams = params ? params : localParams;
            connectHardware();
        }
        
    // Task 3 (DONE)
        function stop (){
            clearInterval(interval);
        }

        exports.start = start;
        exports.stop = stop;
