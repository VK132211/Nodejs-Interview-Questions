/**
 * anonymous functions/function expressions are not hoisted so you can only call them after their declaration
 * named functions/ function declarations are hoisted . You can call them before they are declared.
 */

test();  // TypeError: test is not a function


var test = function(){
    console.log("hello");
    
}