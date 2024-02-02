# first-slice-of-pi
set up routes for a server that handles multiple devices attached to a Pi

**Table of Contents**
 
- [Installation](#installation)
- [Lesson Steps](#lesson-steps)
    - [TODO 1: Study the File Structure](#todo-1-study-the-file-structure)
    - [TODO 2: Initial HTTP Server Setup](#todo-2-initial-http-server-setup)
    - [TODO 3: Sensor Routes](#todo-3-sensor-routes)
    - [TODO 4: Actuator Routes](#todo-4-actuator-routes)
    - [TODO 5: PIR Plugin](#todo-5-pir-plugin)
    - [TODO 6: DHT Plugin](#todo-6-dht-plugin)

## Installation
* This project should be completed on your Pi.
* Enter the command `git clone https://github.com/operationspark/first-slice-of-pi` to add the base files for this project to your projects directory
* Enter the command `cd first-slice-of-pi` to enter the new project's directory
* Enter the command `rm -rf .git .gitignore` so you don't accidentally add the git management files to your own repository when you commit later
* Run the command `npm install -g express cors` to install the libraries we will be using during this project

## Lesson Steps
This project is the first of several that will work together to bake a fully-fledged Raspberry Pi system. There will be a lot of pieces all working together, so while you're working, do your best to keep track of how everything interconnects. It might seem daunting at first, with a total of eight files and several folders organizing those files, but learning how each piece relates to one another now will make the next few projects much simpler.

### TODO 1: Study the File Structure
As mentioned, there are eight files that all work together. Skeletons for all of these files (and in some cases the entire file) have already been provided for you. Before you begin working in them, study how each of these files connects to one another so that you are familiar with the layout and dependencies between files. Below is a brief summary.

The **resources** directory contains two files. **resources.json** is a JSON file that represents your device. Assuming you have your Pi and its connected hardware set up the way that the [Hardware Tests](https://github.com/OperationSpark/hardware-tests) project instructed, this file is accurate and should not be changed. **model.js** serves to export the resources.json file for use by all other files.

The **plugins** directory contains the **internal** directory, which in turn contains two files. These files are what manage the behavior of your sensors (and later LEDs). The **dhtPlugin.js** file holds the code for the plugin that manages your DHT sensor. The **pirPlugin.js** file holds the code for the plugin that manages you PIR sensor.

The **routes** directory contains files that handle routing to your sensors, actuators, and intermediate routes. The **actuators.js** file manages access to your actuators, whereas **sensors.js** manages access to your sensors.

For now, the **servers** directory only contains the **http.js** file. This file pulls all of your routes together (plus a few of its own) and sets up your express server.

Lastly, the **wot-server.js** file is where you start your plugins and servers. This is also the file that you should run using the command `node wot-server.js` if you want to test your code. Keep in mind that this will only work properly if you are testing it on your Pi.

### TODO 2: Initial HTTP Server Setup
This TODO will take place within the **servers/http.js** file. When you first open the file, all you will see are the lines to import the necessary libraries and an export line. 

Right now, there are only three things you need to do in this file. 

1. Initialize the express server immediately after importing it via the line `var app = express();`
2. Tell your server to use CORS with `app.use(cors());`
3. Tell the server how to handle GET requests to both the root and gateway to your device. For example:

```js
app.get('/', function(req, res){
    res.send('Some response for accessing the root');
});
```

will tell the server how to respond to requests to the root. You should also tell it how to handle requests to '/pi', which is the top level gateway to your device. Just as with the root, sending back a simple message should be sufficient.

### TODO 3: Sensor Routes
Most of this TODO takes place in the **routes/sensors.js** file, though at the end you will also need to update the http.js file, so be sure to keep that open.

#### Task 1: Set Up Routes 
The sensors.js file already imports everything you will need, and also exports the constructed router. Your job will be to establish all of the possible sensor routes, of which there are five.

The first is the sensors root, or '/'. This is not to be confused with the '/' route in the http.js file. Because of how we will update the http.js file at the end of this TODO, the path to the sensors root is inherent to any of the defined sensor routes, meaning that '/' actually refers to '/pi/sensors/'. 

For now, all you will want to do for each of these routes is to return the data stored in the model as defined by resources.json and model.js. For example, the routes to '/' and '/dht' (meaning '/pi/sensors/' and '/pi/sensors/dht', respectively) would be defined by:

```js
router.route('/').get(function (req, res, next) {
	res.send(resources.pi.sensors);
});

router.route('/dht').get(function (req, res, next) {
	res.send(resources.pi.sensors.dht);
});
```

In addition to those to routes, you should also include routes to '/dht/temperature', '/dht/humidity', and '/pir'.

#### Task 2: Update HTTP Server
Once you have all the routes in place, then back in the http.js file, you need to add in two things. 

1. At the top of the file, you need to import the routes using `var sensorRoutes = require('./../routes/sensors');`. The single '.' says that the program is looking for the specified file using a relative file path, and the '..' says that it needs to start looking in the parent directory of the current file (i.e. one level up from the servers directory).
2. Just below the line `app.use(cors());`, add in the line `app.use('/pi/sensors', sensorRoutes);`. This tells the server that it should route all requests to '/pi/sensors' or any of its sub-destinations (e.g. '/pi/sensors/pir') through the sensor routes you just defined.

### TODO 4: Actuator Routes
Most of this TODO takes place in the **routes/actuators.js** file, though at the end you will also need to update the http.js file, so be sure to keep that open. You are essentially doing the same thing that you did with the sensors, but there is one part that can be handled differently.

#### Task 1: Set Up Routes
The actuators.js file has the same initial setup as the sensors.js file. Setting up the routes here is similar, as well. 

This time, there are four routes you need to set up: the root '/' (corresponding to resources.pi.actuators), '/leds', '/leds/1', and '/leds/2'. Both '/' and '/leds' can be set up the normal way, but there is a way to combine '/leds/1' and '/leds/2' into a single route, which is especially useful if you plan on adding more LEDs to your device later.

Once you've put in the routes for '/' and '/leds', you can handle the '/leds/1' and '/leds/2' routes using the following code:

```js
router.route('/leds/:id').get(function (req, res, next) {
	res.send(resources.pi.actuators.leds[req.params.id]);
});
```

#### Task 2: Update HTTP Server
Once you have all the routes in place, then back in the http.js file, you once again need to add in two things. 

1. Import the routes using `var actuatorRoutes = require('./../routes/actuators');`. 
2. Tell the server to route all requests to '/pi/actuators' and sub-destinations through your actuator router with `app.use('/pi/sensors', sensorRoutes);`.

### TODO 5: PIR Plugin
Currently, you have your server set up to send responses to any GET request your Pi receives, but the data it sends back will not be current. That's because you never set up a connection with any of the hardware (DHT, PIR, or LEDs). We will ignore the LEDs for this project, but both the PIR and DHT sensors need to be handled now. Let's start with the PIR, as it is a simpler device.

In the **plugins/internal/pirPlugin.js** file, you will see that the resource model has already been imported and some basic variables defined. One importand variable is the "device" variable, which you see we grab straight from the imported resource model. This contains all of the information about the PIR sensor, and can even be updated using this plugin.

Also note that the "onoff" library has been imported, which you will use to connect to and manage interactions with the PIR sensor. 

Your goal will be to create three functions, then update **wot-server.js** to make use of the plugin once it's ready. 

#### Task 1: Connect Hardware
Create a function with no parameters called connectHardware(). The body of this function should create a new Gpio connection with `new Gpio(device.gpio, 'in', 'both')`. Be sure to save the newly created connection in the "sensor" variable, which is already declared at the global scope. 

The Gpio's watch method should be called, with the callback function defined to accept an error and value parameter (see slides or the [Hardware Tests](https://github.com/OperationSpark/hardware-tests) project if you need a reminder on how to do this). The callback function should check for errors, and if there are no errors then update the model's value using the line 

    device.value = !!value;

which converts 0's and 1's into true and false, respectively.

#### Task 2: Start
Create a function to be exported called "start" that accepts a single parameter called "params". This can be done with the line 

    exports.start = function (params) {};

What this does is allow for the start function to be used in other files if the other files use require() to load this file.

The body of the start function should only do one thing, and that is call the connectHardware() function.

#### Task 3: Stop
Create a function to be exported called "stop" that takes no parameters. The body of this function should only call `sensor.unexport()`.

#### Task 4: Update wot-server.js
In wot-server.js, import the PIR plugin with the line 

    var pirPlugin = require('./plugins/internal/pirPlugin');

Then, start the plugin with the command `pirPlugin.start({});`. Make sure that you start it *before* you start the server!

Note that we give an empty object as an argument to pirPlugin.start(). That would be used by the "params" parameter in the start function if you made use of it. You don't have to here, but if you wanted to customize the sensor's behavior that is how you would pass in that information to the plugin.

Finally, in the process.on()'s callback function, add the line

    pirPlugin.stop();

to just before the call to process.exit().

### TODO 6: DHT Plugin
The last thing you need to do is set up your DHT sensor plugin and update the wot-server to use that plugin as well. The process is similar to handling the PIR plugin. Notice once again that there is a "device" variable that grabs the resource model for the DHT sensor. You will use this variable to help interface with the device. Also note the "localParams" and "interval" variables, which you will be using as well.

#### Task 1: Connect Hardware
Create a function with no parameters called connectHardware(). Notice that we have a variable called "sensor" already declared for you in the global scope, as you will need to use that variable. 

In the body of connectHardware(), you will first need to define the value of "sensor". Set sensor equal to an object with the following properties:

1. **initialize** : a function that calls `sensorDriver.initialize(device.model, device.gpio)`, which sets up the connection with your DHT sensor. 

2. **read** : a function that updates the device model with the current sensor values.

To update the model, first you must save the result of reading the sensor values. The function `sensorDriver.read()` returns an object with this data in it.

Next, use the returned object to update your model. For example, if you saved the data object in a variable called "readout", you could update the temperature value using the line

    device.temperature.value = parseFloat(readout.temperature);

You should update both the temperature and the humidity values.

---

Once your sensor object is defined, your connectHardware() function is nearly complete. Right after the object definition, call both sensor.initialize() and sensor.read(). Then add the following code:

```js
    interval = setInterval(function () {
		sensor.read();
	}, localParams.frequency);
```

This sets up an interval that will call sensor.read() at the frequency specified by localParams.

#### Task 2: Start
You're now in the home stretch! There's only a few small tasks left to complete. First, create a function to be exported called "start" that accepts a single parameter called "params". 

The first line of this function's body should be 

    localParams = params ? params : localParams;

which just says to use the "params" parameter if one was given and use the default value of "localParams" if not.

Then, call the connectHardware() function.

#### Task 3: Stop
Create a function to be exported called "stop" that takes no parameters. The body of this function should only call `clearInterval(interval)`.

#### Task 4: Update wot-server.js
In wot-server.js, import the DHT plugin.

Then, start the plugin with the command `dhtPlugin.start({'frequency': 2000});`, though feel free to change the number if you want the sensor to give updates more or less often than every 2000 milliseconds. 

Finally, in the process.on()'s callback function, add the line

    dhtPlugin.stop();

to just before the call to process.exit().

That's it! You've set up a server that provides an interface to multiple devices on your Pi!
