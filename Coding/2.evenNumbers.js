const filterEven = (arr) => arr.filter((item) => item % 2 === 0);

const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evenNumbersArray = filterEven(originalArray);
console.log(evenNumbersArray);

/**
 * 
 * A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
 * Returns the elements of an array that meet the condition specified in a callback function.
 */