// Similarly, the same scenario will occur(just like in 9.js), if we recursively use other microtasks such as Promise. The EventLoop will be continuously occupied with processing the microtask queue, preventing it from reaching the timers queue or executing any other tasks.Consequently, the callback passed to setTimeout will not be executed, and the console statement within it will never be printed.
function recursivePromise() {
  console.log("From Promise");
  Promise.resolve().then(recursivePromise);
}

recursivePromise();

setTimeout(() => {
  console.log("This is from setTimeout.");
}, 0);
