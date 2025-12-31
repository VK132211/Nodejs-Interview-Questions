function findLongestWordReduce(str) {
  const words = str.split(" ");
  const longestWord = words.reduce((longest, currentWord) => {
    return currentWord.length > longest.length ? currentWord : longest;
  }, "");
  return longestWord;
}

const sentence3 = "Google do a barrel roll";
console.log(findLongestWordReduce(sentence3));

/**
 * (method) Array<number>.reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number, initialValue: number): number (+2 overloads)
Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
@param callbackfn — A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

@param initialValue — If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
 */
console.log([1, 2, 3, 4, 6, 7, 22].reduce((acc, val) => acc + val, 0));
