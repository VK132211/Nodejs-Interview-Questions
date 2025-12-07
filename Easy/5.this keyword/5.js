const student = {
  name: "Jason",
  siblings: ["Alice", "Bob"],
  showSiblings() {
    this.siblings.forEach(function (sibling) {
      console.log(`${this.name}'s sibling is ${sibling}`);
    });
  },
};
/**
 * undefined's sibling is Alice
 * undefined's sibling is Bob
 */
student.showSiblings();

//__________________________________________________________________

const student1 = {
  name: "Jason",
  siblings: ["Alice", "Bob"],
  showSiblings() {
    this.siblings.forEach((sibling) => {
      console.log(`${this.name}'s sibling is ${sibling}`);
    });
  },
};
/**
 * Jason's sibling is Alice
 * Jason's sibling is Bob
 */
student1.showSiblings();

// arrow functions don't have there own bindings