function findMaxConsecutiveOnes(arr) {
  let maxCount = 0;
  let currentCount = 0;
  for (let num of arr) {
    if (num == 1) {
      currentCount++;
      if (currentCount > maxCount) maxCount = currentCount;
    } else {
      currentCount = 0;
    }
  }
  return maxCount;
}
const nums = [1, 1, 0, 1, 1, 1];
console.log(findMaxConsecutiveOnes(nums));
