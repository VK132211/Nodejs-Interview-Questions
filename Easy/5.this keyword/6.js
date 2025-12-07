const student = {
  name: "Jason",
  siblings: ["Alice", "Bob"],
  showSiblings: () => {
    console.log(this.name);
  },
};
/**
 *  node .\6.js
 *  undefined
 */
student.showSiblings();