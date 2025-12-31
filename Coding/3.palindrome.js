function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace("/[^a-z0-9]/g", "");
  let i = 0;
  let j = cleanedStr.length - 1;
  while (i < j) {
    if (cleanedStr[i] !== cleanedStr[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
console.log(isPalindrome("Madam"));
console.log(isPalindrome("racecar"));
console.log(isPalindrome("vinay"));
