function flattenArray(arr) {
  const flatenArray = arr.flat(Infinity);
  return flatenArray;
}
const array = [
  [3, 4, 58],
  [709, 8, 9, [10, 11]],
  [111, 2],
];
console.log(flattenArray(array));

function flattenArray2(arr) {
  let stack = [...arr];
  let result = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  return result.reverse();
}

console.log(flattenArray2(array));
