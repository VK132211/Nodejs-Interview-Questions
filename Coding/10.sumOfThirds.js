const sumOfThirds = (arr) => {
  if (arr.length < 3) return 0;
  let sum = 0;
  for (let i = 2; i < arr.length; i += 3) {
    sum += arr[i];
  }
  return sum;
};

console.log(sumOfThirds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
console.log(sumOfThirds([13, 14, 15]));
console.log(sumOfThirds([13, 14]));
