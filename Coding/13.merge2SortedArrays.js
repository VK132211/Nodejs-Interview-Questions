function merge2SortedArrays(arr1, arr2) {
  let m = arr1.length;
  let n = arr2.length;
  let i = 0;
  let j = 0;
  let k = 0;
  let result = Array(m + n);
  while (i < m && j < n) {
    if (arr1[i] < arr2[j]) {
      result[k] = arr1[i];
      i++;
      k++;
    } else {
      result[k] = arr2[j];
      j++;
      k++;
    }
  }
  while (i < m) {
    result[k] = arr1[i];
    i++;
    k++;
  }
  while (j < m) {
    result[k] = arr2[j];
    j++;
    k++;
  }
  k = 0;
  while (k < m + n) {
    arr1[k] = result[k];
    k++;
  }
  return arr1;
  //   return result;
}
console.log(merge2SortedArrays([1, 2, 9, 99], [3, 4, 101, 102]));
