const number = require("./counter");//we import counter module
const number2 = require("./counter"); // it uses the same instance from above
const number3 = require("./counter");// it uses the same instance from above

console.log(number); //1
console.log(number2); //1
console.log(number3); //1