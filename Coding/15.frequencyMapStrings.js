/**
 * "aaz","zza" => false
 * "qwerty","qewytr" => true
 * one string can be formed by rearranging letters in other string
 */

function isStringCreated(str1, str2) {
  if (str1.length !== str2.length) return false;
  let freqMap = {};
  for (let val of str1) {
    freqMap[val] = (freqMap[val] || 0) + 1;
  }
  for (let val of str2) {
    if (freqMap[val]) {
      freqMap[val] -= 1;
    } else {
      return false;
    }
  }
  return true;
}

console.log(isStringCreated("aaz", "zza"));
console.log(isStringCreated("qwerty", "qewytr"));
