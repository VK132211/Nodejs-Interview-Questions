function findMaximumNumber(arr) {
  const maximum = arr.reduce((max, currentElem) => {
    return currentElem > max ? currentElem : max;
  }, 0);
  return maximum;
}
const arrayOne = [11, 2, 3, -99, 101, 4, -1, -4];
console.log(findMaximumNumber(arrayOne));

