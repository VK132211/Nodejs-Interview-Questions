function countOccurenecesOfEachChar(str) {
  const freqMap = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    freqMap[char] = (freqMap[char] || 0) + 1;
  }
  return freqMap;
}
console.log(countOccurenecesOfEachChar("vinaykumar"));
