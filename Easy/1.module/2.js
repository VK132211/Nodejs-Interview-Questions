require("./db");
const one = require("./1");
console.log("FROM 2.js");

one("hello");

/**
 * node 2.js
From DB
FROM 1.js
FROM 2.js
hello
 */