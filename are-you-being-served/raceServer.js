const http = require("http");
const async = require("async");
const { endianness } = require("os");

const port = 8686;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    let racers = ["Green Ambler", "Catalack", "Steel Runner", "G.I. Jogger"];

    // TODO 6: Get the start time for the race (DONE)
        let d = new Date();
        let startTime = d.getTime();

    // TODO 11: Make the whole thing parallel ()
    async.parallel(
        // TODO 8: Supply an array of functions (DONE)
            [
                function (callback){wrapper (callback)},
                function (callback){wrapper (callback)},
                function (callback){wrapper (callback)},
                function (callback){wrapper (callback)},
            ],
        function (error, results) {
            // TODO 9: add a callback function... () 
                // Step 1: The Preamble //
                    res.write("Results:\n");

                // Step 2: The Racers Loop //
                    var victoryOrder = sortTogether(racers, results);
                
                // Step 3: The Racers Response //
                    for (i = 0; i < racers.length; i++){
                        res.write(victoryOrder[i] + "\n");
                    }

                // Step 4: The Race Time //
                    let d = new Date();
                    let endTime = d.getTime();
                    

                    res.end(endTime - startTime + "\n");
        }
    );
    
}).listen(port);

// TODO 7: create a common function... ()
    function wrapper(callback){
        setTimeout(function (){
            let d = new Date();
            callback(null, d.getTime())
        }, Math.random()*1000)
    }

function sortTogether(names, times) {
    var tempList = [];
    for (var i = 0; i < names.length; i++) {
        tempList.push({'name': names[i], 'time': times[i]});
    }

    tempList.sort(function(a, b) {
        return ((a.time < b.time) ? -1 : ((a.time == b.time) ? 0 : 1));
    });

    for (var i = 0; i < tempList.length; i++) {
        names[i] = tempList[i].name;
    }
    return names;
}
