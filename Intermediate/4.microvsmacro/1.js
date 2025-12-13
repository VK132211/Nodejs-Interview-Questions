console.log("Start"); //sync code will run first

//setImmediate schedules the callback to run in the next iteration of the event loop.
// It is designed to execute an asynchronous code as soon as possible once the synchronous code finishes executing.
setImmediate(() => {
  // this is the callback that will run.
  console.log("Immediate Callback from setImmediate");
});

console.log("End"); //sync code will run second
