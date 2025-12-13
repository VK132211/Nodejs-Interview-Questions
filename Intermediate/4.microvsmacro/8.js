const fs = require("fs");
//  I/O cycle, remember the rule again in an I/O cycle setImmediate always runs first even if setTimeout time is 0
fs.readFile("test.txt", () => {
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  setImmediate(() => {
    console.log("setImmediate");
  });
});

// nextTick will always run first.The reason is, it runs before event loop continues. Remember, both setTimeout and setImmediate are event loop related but not process.nextTick.
process.nextTick(() => {
  console.log("nextTick");
});
