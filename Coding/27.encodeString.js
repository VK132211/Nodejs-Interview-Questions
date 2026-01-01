/**
 * abbcccddddeea
 * 1a2b3c4d2e1a
 */

function encodeString(input) {
  if (input.length == 0) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i < input.length; i++) {
    if (input[i] == input[i - 1]) {
      count++;
    } else {
      result += count + input[i - 1];
      count = 1;
    }
  }
  result += count + input[input.length - 1];
  return result;
}
console.log(encodeString("abbcccddddeea"));
