const cluster = require("cluster");
const os = require("os");
const cpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid}`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  // workers will share the same TCP connection on the same port
  const express = require("express");
  const app = express();
  app.get("/heavy", (req, res) => {
    let counter = 0;
    while (counter < 9000000000) {
      counter++;
    }
    console.log(` Heavy request ${process.pid}`);
    res.send(`${process.pid} completed, counter is:${counter}`);
  });

  app.get("light", (req, res) => {
    res.send("light task");
  });

  app.listen(6000, () => {
    console.log("listening to port 6000");
  });
}
