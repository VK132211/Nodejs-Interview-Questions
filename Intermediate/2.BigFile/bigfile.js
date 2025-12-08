var http = require("http");
var fs = require("fs");

var server = http.createServer((req, res) => {
  if (req.url !== "favicon.ico") {
    res.writeHead(200, { "content-type": "text/plain" });
    var readStream = fs.createReadStream("./bigFile.txt");
    console.log("req made");
    //pipe, pipes/connects a readable steam to a writable, so "res" object is a writable,so we pipe readStream to res which is a writable
    readStream.pipe(res);
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Listening to port 5000");
});
