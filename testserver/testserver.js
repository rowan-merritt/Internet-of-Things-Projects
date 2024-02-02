var http = require("http");
var port = process.argv[2];

http.createServer(function(req,res){
  // handle response
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write();
  res.end();
}).listen(port);

console.log("Being server on port" + port);
