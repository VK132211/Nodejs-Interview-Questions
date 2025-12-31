function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}
const originalArrayOne = [2, 4, 6, 8, 0, 0, 8, 6, 4, 2];
const uniqueElementsOne = removeDuplicates(originalArrayOne);
console.log(uniqueElementsOne);

function removeDuplicatesEfficient(arr) {
  const uniqueArr = [];
  const seen = {};
  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (!seen[element]) {
      uniqueArr.push(element);
      seen[element] = true;
    }
  }
  return uniqueArr;
}
const originalArrayTwo = [1, 3, 5, 7, 9, 9, 7, 5, 3, 1];
const uniqueElementsTwo = removeDuplicatesEfficient(originalArrayTwo);
console.log(uniqueElementsTwo);
