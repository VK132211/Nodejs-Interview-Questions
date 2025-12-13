const app = require("express")();
const { fork } = require("child_process");

app.get("/heavy", (req, res) => {
  //spawn a new Node.js process
  var child = fork(__dirname + "/count.js");
  child.on("message", (myCount) => {
    console.log("Sending heavy result");
    res.send(myCount);
  });
  child.send("START_COUNT");
});

app.get("/light", (req, res) => {
  res.send("Hello from light");
});

app.listen(5000, () => console.log("Server running on port 5000"));
