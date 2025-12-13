const fs = require("fs");

console.log("Start");

// Asynchronous file read operation (I/O event), the output depends on how fast the txt file is read and the environment, on some environments we can get the output from setImmediate before the fs.readFile callback or after but setTimeout will run after setImmediate as it has 1 second delay this time
fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("Content of the file is:", data);
});

setImmediate(() => {
  console.log("From setImmediate");
});

// this time we wait 1 second
setTimeout(() => console.log("From setTimeout"), 1000);

console.log("End");
