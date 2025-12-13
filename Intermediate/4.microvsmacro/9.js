function recursiveNextTick() {
  console.log("From recursiveNextTick");
  //   nextTick is dangerous to use recursively because the other phases in the event loop will not run, to demonstrate this you can quickly press ctrl+c or cmd+c on mac to stop the code after you start and you will see that callback of setTimeout will never run
  process.nextTick(recursiveNextTick);

  //   But if you use setImmediate,the callback in setTimeout will run,very quickly stop the code onece you execute it and you will see that callback in setTimeout is run when you use setImmediate instead of nextTick
  //   setImmediate(recursiveNextTick);
}

recursiveNextTick();

setTimeout(() => {
  console.log("This is from setTimeout.");
}, 0);
