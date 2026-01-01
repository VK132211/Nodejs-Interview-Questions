function findSecondLargest(arr) {
  if (arr.length < 2) {
    throw new Error("Array must contain atleast two elements");
  }
  let largest = -Infinity;
  let secondLargest = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] < largest) {
      secondLargest = arr[i];
    }
  }
  return secondLargest;
}

console.log(findSecondLargest([-100, 2, 99, 3, 108, 96, 121, -103]));
