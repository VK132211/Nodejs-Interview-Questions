function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  const sortedLeft = quickSort(left);
  const sortedRight = quickSort(right);
  return sortedLeft.concat(pivot, sortedRight);
}

const unsortedArray = [5, 2, 9, 1, 3, 6];
console.log(quickSort(unsortedArray));
