# interface-inyourface
PROJECT: designing a series of websites that make use of various interface techniques

**Table of Contents**
 
- [Setup](#setup)
- [Installation](#installation)
- [Lesson Steps](#lesson-steps)
    - [Polling Web Page: ](#polling-web-page)
        - [TODO 1: Initialize Records Variables](#todo-1-initialize-records-variables)
        - [TODO 2: Update Records Functions](#todo-2-update-records-functions)
        - [TODO 3: Regular Polling](#todo-3-regular-polling)
        - [TODO 4: WebSocket Polling](#todo-4-websocket-polling)
    - [Actuator Form Web Page](#actuator-form-web-page)
        - [TODO 5: Actuator AJAX POST](#todo-5-actuator-ajax-post)
    - [Device Parser Web Page](#device-parser-web-page)
        - [TODO 6: Device Parser AJAX GET](#todo-6-device-parser-ajax-get)
        - [TODO 7: Generate Sensors URL](#todo-7-generate-sensors-url)
        - [TODO 8: Device Parser AJAX Success](#todo-8-device-parser-ajax-success)
    
## Setup
### Install Visual Studio Code (VS Code for short)
 - We will be running all of our projects on our own machines for this class. To that end, we will make use of Visual Studio Code.
 - If you are on a Mac, you may already have Visual Studio Code already installed. If it is not, you can download the installer here (https://code.visualstudio.com/download).
 #### Mac Installation
 - Download the only option available and walk through the setup using the default options.
 #### Windows Installation
 - Download the 64 bit System Installer and walk through the setup using the default options. You might want to set a Desktop shortcut
 
### Further Windows Setup
 - If you use Windows, adding in Bash and Git support will make your life much easier with these projects. In Windows 10, the easiest way to do this is with the following steps:
 
 #### Bash Support
 * Click in the Windows search area and type "Powershell"
 * Right click on "Windows PowerShell" and select "Run as administrator"
 * Paste the following into the PowerShell terminal: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
 * Confirm that this is what you want to do and restart your computer after the prompt (or after PowerShell finishes working if the prompt doesn't appear)
 * Reopen VS Code. You should see a prompt to install WSL (Windows Subsystem for Linux). Install this. If the prompt doesn't show up, then search for Remote - WSL in the Extensions section of VS Code.
 
 #### Git support
 * Go to https://git-scm.com/download/win and download the Git installer
 * Walk through the installation using the default options
 * Restart your computer

### Final VS Code Setup Steps
 - Open up the Extensions section of VS Code and and search for "open in browser". You should see a version of "open in browser" with version 2.0.0 by "TechER". Click "Install" for this extension. This will allow you to open up any HTML files you create directly in your browser by right-clicking on the file (in the VS Code file browser) and selecting "Open in Default Browser".
 - Open up a new Terminal in VS Code. Type `git clone https://github.com/<your github username>/<your github username>.github.io` to place a copy of your main repository on your machine. 

## Installation
* Using the terminal, go into your `<username>.github.io` directory. You can use this by typing `cd <username>.github.io` (assuming you haven't changed directories since completing the VS Code setup steps)
* In the terminal, enter the command `mkdir iot-projects` to create a directory for all of your IoT projects to be stored
* Enter the command `cd iot-projects` to enter your project directory
* Enter the command `git clone https://github.com/operationspark/interface-inyourface` to add the base HTML files for this project to your projects directory
* Enter the command `cd interface-inyourface` to enter the new project's directory
* Enter the command `rm -rf .git .gitignore` so you don't accidentally add the git management files to your own repository when you commit later

## Lesson Steps
We have three separate web pages that we will be creating. One will demonstrate two separate polling methods for obtaining device data, one will demonstrate sending data to a device using AJAX, and the third will demonstrate a request for device information using AJAX.

### Polling Web Page
This web page will be split into four pieces of functionality. There will be two charts that display temperature readings taken over time, and there will be two separate displays of high and low temperatures taken using each method.  On the left half of the screen will be the chart detailing temperature readings taken every ten seconds, as well as the highest and lowest temperatures recorded using this method. On the right half of the screen will be the chart detailing temperature readings taken in real time, along with the corresponding highest and lowest recorded temperatures.

#### TODO 1: Initialize Records Variables
We will need to keep track of the highest and lowest recorded temperatures using both regular polling and WebSocket polling. This will require four variables. We'll want our highest values to start at a ridiculously low value in case we only record low temperatures (the thermometer might be a freezer, for all we know), and we'll want to initilaize our lowest values to a ridiculously high number for similar reasons.

Add in the variables `regHighest`, `regLowest`, `wsHighest`, and `wsLowest` to your code. Set the initial high values to be `-500` and the initial low values to be `500`. 

Next, use jQuery to add in elements to the web page that will display the highest and lowest values for us. You can add the first element -- the higest value read using regular polling -- with the following line:

    $('#reg-chart-container').append($("<p>").attr("id", "reg-highest").text("Highest recorded value is " + regHighest));

Here, `#reg-chart-container` is the id for the div we are adding the new element to. The new element is a `<p>` with the id of "reg-highest". The other three elements can be added in using similar code, with ids of "reg-lowest" for the lowest regular polling temperature and "ws-highest" and "ws-lowest" for the WebSocket high and low temperatures. The WebSocket temperature records should be added to the div with the id `#ws-chart-container`.

#### TODO 2: Update Records Functions
We will need to create functions to update the high and low temperature records we are recording. The simplest way to do this is to create one function for regular polling records and one function for WebSocket polling records.

You can update the text displayed using jQuery. For instance, if you were to write `$("#reg-highest").text("Highest recorded value is " + 72);` then your element displaying the highest recorded regular polling temperature would now display "Highest recorded value is 72". Go ahead and write the bodies of the functions "updateRegRecords(value)" and "updateWSRecords(value)".

"updateRegRecords(value)" should update the high and low records of your elements with ids of "reg-highest" and "reg-lowest", and `value` is the current temperature being read from the device.

"updateWSRecords(value)" should update the high and low records of your elements with ids of "ws-highest" and "ws-lowest", and `value` is again the current temperature being read from the device.

#### TODO 3: Regular Polling
Before we can actually update our high and low records or populate any of our data charts, we need to get data from a temperature sensor somewhere. We are going to do that in two ways, the first of which is through regular polling. The data we obtain this way will be displayed on the left side of the screen.

To start, create a function called "doPoll()" that will handle our regular polling. Our doPoll() function should only call `$.getJSON()`. You will need to provide a callback function that takes a single parameter called "result". The skeleton for this will look like:

    $.getJSON("https://f3dc5044859d.ngrok.io/pi/sensors/temperature", function (result) {});

**IMPORTANT NOTE:** The jumble of letters that is `f3dc5044859d` will likely need to be changed due to how ngrok works. Please ask your instructor for the correct URL.

The body of your callback function should perform three tasks. The first is to execute the following function call:

    addDataPoint(result, regData, regChart);

This function call adds the current temperature reading to the list of data points on display in the regular polling temperature chart. After that you need to call your `updateRegRecords()` function, passing in the argument `results.value`. "results" is not actually a simple temperature value, but an object holding the temperature value. Thus, you need to access the "value" property in order to pull out the actual temperature being measured.

Finally, you need to add the line `setTimeout(10000);`. This will make sure that "doPoll()" is called every 10 seconds.

Once you've completed your doPoll() function, you need to actually call the function. You can do that by putting a function call for doPoll() right after its definition.

Once all of this is done, you should see the left chart on your web page updating every 10 seconds and the high and low temperatures now displaying more sensible numbers.

#### TODO 4: WebSockets Polling
The second way we are going to obtain temperature data is through WebSocket polling. The first thing we need to do is create a new WebSocket connection as follows:

    var socket = new WebSocket('ws://f3dc5044859d.ngrok.io/pi/sensors/temperature');

**IMPORTANT NOTE:** The jumble of letters that is `f3dc5044859d` will likely need to be changed due to how ngrok works. Please ask your instructor for the correct URL.

This will create and store a WebSocket connection with the temperature sensor we have been polling in the variable named "socket".

The second step to creating the WebSocket connection is to define what we should do when we receive an update from the device we have connected to. To do so we must fill in the body of the function `socket.onmessage`. This function takes in a parameter called "event". "event" is an object that can be parsed using `JSON.parse()`, so to get the temperature measurement we must pull that out of our event data using the following line to our function body:

    var result = JSON.parse(event.data);

Next, we must add the data point to the WebSocket chart, which is done similarly to how we added the data point in the regular polling section. We add the line:

    addDataPoint(result, wsData, wsChart);

The last thing we need to add to our `socket.onmessage` function is a call to update the record highs and lows of the WebSocket connection. This is where you will call your `updateWSRecords()` function. Remember to pass it the "value" property of the result and not the result object itself!

Finally, you need to add a function body to the `socket.onerror` function. For this, all you need to do is write the error to the console, and you're done!

#### Bonus
Can you rewrite your code to use only a single "updateRecords()" function rather than updateRecRecords() and updateWSRecords()?

### Actuator Form Web Page
The next web page that you need to create is the actuator form web page. This is a web page that will allow you to send text to a display unit at a remote location. You can then click on a link that will show you a camera display of the sensor (the camera link will not update in real time, so if you don't see your message displayed wait a few seconds and hard refresh the page).

#### TODO 5: Actuator AJAX POST
There's really only one thing that needs to be done for this web page, and that's put in an AJAX call to send the necessary POST to the actuator. The skeleton of an AJAX call looks like this:

    $.ajax({ });

Of course, that won't do much on its own. What you'll need to do is fill in the properties of the currently empty object being passed into the AJAX call. The first of these properties should be as follows:

```js
url: 'http://devices.webofthings.io/pi/actuators/display/content/',
dataType: 'text',
method: 'POST',
contentType: 'application/x-www-form-urlencoded',
data: $(this).serialize(),
```

These properties serve the following purposes:

* url: where to send the request to
* dataType: the type of data being returned
* method: the type of request being sent (in this case a post, meaning we're also sending information to the server)
* contentType: the format of the data we are sending to the server (in this case the display actuator)
* data: the actual data we are sending; `$(this).serialize()` transforms the text we have in our input box into the "x-www-form-urlencoded" data type

You aren't quite done yet, however. There are still two more important properties that need to be added. These are the `success` and `error` properties, and both of them should have functions as their values. Specifically, the `success` property should have the value:

```js
function( data, textStatus, jQxhr ){
    $('#response pre').html( data ); 
}
```

which writes the response returned by the server after submitting our data to `<pre>` tag in our div with the id of "response".

The `error` property, on the other hand, should have the value of:

```js
function( jqXhr, textStatus, errorThrown ){
    console.log( errorThrown ); 
}
```

which simply writes any errors that occur to the console.

### Device Parser Web Page
The final web page that needs to be created is the device parser web page. This will request information regarding a specific device and then display it upon receiving the response.

#### TODO 6: Device Parser AJAX GET
The first step is to make an AJAX call, just as we did with the actuator form page. This time, however, we are going to be making a GET request instead of a POST. The properties we need to place in the object being passed to this AJAX call (excluding the success function) are as follows:

```js
url: $('#host').val(),
method: 'GET',
dataType: 'json',
error: function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
},
```

A portion of the outer AJAX call's success function has already been written for you. Take a moment to examine what the first two lines of the success function are doing before moving on to generating the sensors URL. It's alright if you don't know where terms like `data.links.meta.title` and `meta.links.doc.rel` come from. The only way to know that these pieces of data exist is to know the format of the data sent back by our GET request, which is generally impossible if you don't know about the device you are querying. We'll talk about how we can find out that information and what assumptions we can make about general devices to help guess this information much later in class. The important thing right now is that you understand the jQuery code. If it helps, try playing around with the first two lines of the success function and see how it changes the web page after you make your GET request.

#### TODO 7: Generate Sensors URL
This step is simple. You'll need to create a new variable called `sensorsPath` and assign it the concatenated value of `data.url` and `data.resources.sensors.url`. "data.url" is the URL of the device we are querying, and "data.resources.sensors.url" is the relative path down to the sensors from the root of that device.

#### TODO 8: Device Parser AJAX Success
The final step is a big one, as their are four parts to it. The goal here is to use the list of sensors (found in the parameter `data`) returned from the successful inner AJAX call to produce a list of links on your web page. The approach to this is going to be to create a string that contains the HTML code that would generate such a list. 

**Part 1**
To start, create a new string variable (call it `sensorList`) and initialize it to an empty string.

**Part 2**
Next, we want to announce how many sensors were found. The parameter "data" contains a list of all sensors (in object form), so you can do that with the following line of code:

    $('#sensors').html(Object.keys(data).length + " sensors found!");

That line tells the `<div>` with id = "sensors" that it should contain a string listing the number of keys found in the data returned from our AJAX query (which is the number of sensors that exist!).

**Part 3**
Third, we want to iterate over the list of sensors returned. Because `data` is JSON format, you can iterate over it as you would any other object. This iteration should build up the `sensorsList` string initialized earlier, and it should ultimately consist of a series of text blocks of HTML code containing `<li>` elements with `<a>` elements inside. As an example, if we had a sensor in our "data" object with the key of "temp", we could generate that block of HTML code with the following line:

    var html = "<li><a href=\"" + sensorsPath + "temp" + "\">" + data["temp"].name + "</a></li>";

Of course, you'll need to generalize that line of code and use it to build up your `sensorsList` string, but once that's done you're ready to move on to the final step.

**Part 4**
The final step is to use jQuery to display the list of sensors that you should have just created. That can be done with the following line of code:

    $('#sensors-list').html(sensorsList);

And with that, you're done! Congratulations, and don't forget to save your code to GitHub!
