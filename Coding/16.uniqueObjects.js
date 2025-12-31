/**
 * [{name:"vk"},{name:"mk"},{name:"vk"},{name:"mk"},{name:"12345"}]
 */

// function getUniqueArray(arr) {
//   const unique = [];
//   const seen = {};
//   for (let i = 0; i < arr.length; i++) {
//     const name = arr[i].name;
//     if (!seen[name]) {
//       unique.push(arr[i]);
//       seen[name] = true;
//     }
//   }
//   return unique;
// }
console.log(getUniqueArray([{ name: "vk" }, { name: "mk" }, { name: "vk" }, { name: "mk" }, { name: "12345" }]));

// const seen = new Set();
// const unique = arr.filter(item => {
//   const isDuplicate = seen.has(item.name);
//   seen.add(item.name);
//   return !isDuplicate;
// });

/**
 *Map(3) {
  "vk" => { name: "vk" },
  "mk" => { name: "mk" },
  "12345" => { name: "12345" }
}

 */

function getUniqueArray(arr) {
  return Array.from(arr.reduce((map, item) => map.set(item.name, item), new Map()).values());
}

// const sentences = ["Hello world", "JavaScript is great"];

// const words = sentences.flatMap(s => s.split(" "));
// console.log(words); 
// Output: ["Hello", "world", "JavaScript", "is", "great"]
