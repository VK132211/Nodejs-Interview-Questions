console.log("Start"); // sync code so this will run immediately

// The output may be different depending on the environment, setImmediate or setTimeout will run first,The execution order will depend on various factors
setImmediate(() => {
  console.log("From setImmediate");
});

// setTimeout time is set to 0
setTimeout(() => {
  console.log("From setTimeout");
}, 0);

console.log("End"); // sync code this will run as the second in the call stack
