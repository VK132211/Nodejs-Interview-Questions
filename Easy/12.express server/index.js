const express = require("express");
const app = express();
const port = 5000;
const ejs = require("ejs");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// SSR
app.get("/user/:user_name", (req, res) => {
  res.render("index", { username: req.params.user_name });
});

// Node.js Built-in --watch Mode:
// The --watch mode is a feature integrated directly into Node.js (introduced as experimental in v18.11.0 and stable in later versions like v22).
// It provides a simpler, built-in way to achieve automatic restarts upon file changes without needing an external dependency.
// To use it, you simply add the --watch flag when running your Node.js script:
//     node --watch your_script.js
// http://localhost:5000/

// app.METHOD(PATH, HANDLER)
// (req, res, next)

app.get("/", (req, res) => {
  res.send("Hi from an express app");
});

app.get("/test", (req, res) => {
  res.send("<h1>some html</h1>");
});

app.get("/user", (req, res) => {
  console.log(req.query?.id);
  res.send("this is a user route");
});

app.get("/account/:id", (req, res) => {
  let num = +req.params.id;
  if (isNaN(num)) {
    return res.send("seerver only accepts numbers");
  }
  res.send("number sent");
});

//  Express 5 adopted a stricter version of its path-matching engine (path-to-regexp), which requires that any wildcard character (*) used for a route segment must now be part of an explicitly named parameter or a capturing group.
// ✅ CORRECT (Standard 404 handling)
// Place this AFTER all your other valid routes.
app.use((req, res) => {
  res.status(404).send("No route here");
});
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
