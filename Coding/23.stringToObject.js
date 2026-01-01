function stringToObject(str, finalValue) {
  const keys = str.split(".");
  let result = {};
  let current = result;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    current[key] = i === keys.length - 1 ? finalValue : {};
    current = current[key];
  }
  return result;
}

console.log(JSON.stringify(stringToObject("a.b.c.d", "vk")));
console.log(stringToObject("a.b.c", "vk"));
