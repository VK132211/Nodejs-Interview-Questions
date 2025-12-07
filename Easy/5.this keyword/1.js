const student = {
  firstName: "Vinay",
  lastName: "M",
  getFullName() {
    return this.firstName + " " + this.lastName;
  },
};
console.log(student.getFullName());

// this keyword refers to the object it is called on
// always look how the function is called.