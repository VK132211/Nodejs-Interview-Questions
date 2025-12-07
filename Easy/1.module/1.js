/**
 * A module is a single file that contains some code so each file is just a  single module.
 * A module can be loaded/imported from another modules using the built-in keyword require.
 * To make functions,objects, methods,strings etc. available outside a module, use the built-in module.exports object.
 */

require("./db");
console.log("FROM 1.js");

function showMessage(message) {
  console.log(message);
}

module.exports = showMessage;
