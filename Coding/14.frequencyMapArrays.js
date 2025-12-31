/**
 * [1,2,3],[4,1,9] => true
 * [1,2,3],[1,9] => false
 * [1,2,1],[4,4,1] => false
 * every value in array1 has it's corresponding square value in array2
 */
function isSameFrequency(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  let freqMap1 = {};
  let freqMap2 = {};
  for (let val of arr1) {
    freqMap1[val] = (freqMap1[val] || 0) + 1;
  }
  for (let val of arr2) {
    freqMap2[val] = (freqMap2[val] || 0) + 1;
  }
  for (let k in freqMap1) {
    if (!k * k in freqMap2) return false;
    if (freqMap1[k] !== freqMap2[k * k]) return false;
  }
  return true;
}

console.log(isSameFrequency([1, 2, 3], [4, 1, 9]));
console.log(isSameFrequency([1, 2, 3], [1, 9]));
console.log(isSameFrequency([1, 2, 1], [4, 4, 1]));
