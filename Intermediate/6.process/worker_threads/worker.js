const { parentPort, workerData } = require("worker_threads");

let counter = 0;
console.log(workerData);

for (let i = 0; i < 10000000000; i++) {
  counter++;
}

parentPort.postMessage(counter);