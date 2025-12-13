console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

// remember, nextTick has a higher priority than Promises, that is why this code will run before Promise even though the Promise above have already resolved
process.nextTick(() => {
  console.log("process.nextTick callback");
});

console.log("End");
