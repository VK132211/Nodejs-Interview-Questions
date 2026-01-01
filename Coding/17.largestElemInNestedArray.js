function findLargestElement(arr) {
  const flatenArray = arr.flat(Infinity);
  return flatenArray.sort((a, b) => b - a)[0];
}
const array = [
  [3, 4, 58],
  [709, 8, 9, [10, 11]],
  [111, 2],
];
console.log(findLargestElement(array));

function findLargestElement2(arr) {
  let max = Number.NEGATIVE_INFINITY;
  function traverse(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        traverse(arr[i]);
      } else {
        if (arr[i] > max) max = arr[i];
      }
    }
  }
  traverse(arr);
  return max;
}
console.log(findLargestElement2(array));

