// requestServer.js file
    // TODO 4: Generalize With Command Line Arguments (DONE)
        var args = process.argv.slice(2);

    // TODO 1: Initialize Variables (DONE)

        const request = require("request");
        const http = require("http");
        var port = 8686;

    // TODO 2: Basic Request Server (DONE)

        http.createServer (function (req, res){

            var url = args[0] ? args[0] : "http://p-m-merritt.github.io";

            request(url, function (error, response, body){

            if (response.statusCode == 200 && !error === true){
                res.writeHead(200,{"content-type": "text/html"})
                res.write(body);
            }

            else{
                res.writeHead(20,{"content-type": "text/plain"})
                res.write(error.toString());
            }

            res.end()
            });

        }).listen(port);

console.log("Serving on port " + port);
