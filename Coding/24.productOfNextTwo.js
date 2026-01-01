function productOfNextTwo(arr) {
  const product = arr.reduce((acc, val) => acc * val, 1);
  const result = arr.map((item) => product / item);
  return result;
}
console.log(productOfNextTwo([3,4,5]));
/**
 * [3,4,5] -> [20,15,12]
 */
