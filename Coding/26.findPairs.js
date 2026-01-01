/**
 * input1:[1,2,3,4,5,6,7,8,9]
 * input2:10
 * output:[[4,6],[3,7],[2,8],[1,9]]
 */

function findPairs(input1, input2) {
  let seen = new Set();
  let result = [];
  for (let i = 0; i < input1.length; i++) {
    const complement = input2 - input1[i];
    if (seen.has(complement)) {
      result.push([complement, input1[i]]);
    }
    seen.add(input1[i]);
  }
  return result;
}

console.log(findPairs([1, 2, 3, 4, 5, 6, 7, 8, 9], 10));
