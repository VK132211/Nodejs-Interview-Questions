const fs = require("fs");

console.log("Start"); // sync code so this will run immediately

// Asynchronous file read operation (I/O event)
// But if you move the two calls(setTimeout and setImmediate) within an I/O cycle, the setImmediate callback is ALWAYS executed first:
fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log(data);
  // setTimeout time is set to 0
  setTimeout(() => {
    console.log("From setTimeout");
  }, 0);

  setImmediate(() => {
    console.log("From setImmediate");
  });
});

console.log("End"); // sync code this will run as the second in the call stack

/* This is how this code will run:
1)console.log("Start") will run first
2)console.log("End") will run second
3)Timers phase is skipped currently there is no setTimeOut
3)fs.readFile is an I/O event so it is placed to LIBUV API 
4) Pending callbacks phase is skipped at the moment as there is not pending callbacks for I/O events.
5) Idle, prepare phase is skipped as there is no deferred callbacks exist
6)The Poll phase: the callback from the I/O event from fs.readFile is placed to the Poll phase and then passed to the call stack and executed because call stack is empty at this point and we see the output "This is a test file" and then setTimeout and setImmediate functions which exist inside fs.readFile are placed to LIBUV API
7)check and close callbacks phases are skipped.
8)Now we are at the beginning of the next loop.Timers is skipped as there is no timers yet.
9)For the Pending callbacks phase,there is nothing pending so it is skipped and Idle, prepare is skipped and poll is skipped because we already executed the callback of I/O event that is fs.readFile.
10)Now the callback from setImmediate is placed to the check first 
11) Since the call stack is empty, the callback of setImmediate is executed 
12)close callbacks is skipped
13) Now we are back at a new loop and so far the only thing left is the setTimeout and its callback is placed into the Timers phase.
14) all the other phases are skipped and the callback of the setTimeout that exists in the Timers phase is placed to the call stack and executed.

*/
