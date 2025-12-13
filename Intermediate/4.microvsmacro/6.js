setTimeout(() => console.log("setTimeout 1"), 0); //setTimeout is a macrotask

// another setTimeout with time set to 0
setTimeout(() => {
  console.log("setTimeout 2");

  // now inside this setTimeout,we have other microtasks
  Promise.resolve("Promise 1").then(console.log); //Promise is a microtask
  Promise.reject("Promise 2").catch(console.log); //Promise is a microtask
  queueMicrotask(() => console.log("queueMicrotask 1"));

  // nextTick runs before Promises and queueMicrotask above in this context because nextTick has a higher priority than queueMicrotask and Promise
  process.nextTick(console.log, "nextTick 1"); //nextTick is a microtask
}, 0);

setTimeout(() => console.log("setTimeout 3"), 0); //setTimeout is a macrotask
