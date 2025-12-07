/**
 * let and const have block scoped | var has function scoped
 * we can't reassign new values to the variables created using the "const" keyword
 * hoisting means declarations are moved to top of their scope, not the initilization.
 * unlike var, a let varaiable cannot be re-declared within its scope
 * let and const are hoisted to top of the block they are in but not initialized to the default undefined value
 * so we cannot use them until they are declared.If we do, ReferenceError is thrown.
 * variable declared using var can be accessed before they are declared  and are equal to undefined.
 */

{
  let firstName = "Vinay";
  var middleName = "Kumar";
  const lastName = "M";
}
// Kumar
console.log(middleName);

//ReferenceError: firstName is not defined
console.log(firstName);
console.log(lastName);

