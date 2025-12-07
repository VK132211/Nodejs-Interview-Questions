const student = {
  firstName: "Vinay",
  lastName: "M",
  getFullName() {
    return this.firstName + " " + this.lastName;
  },
};
const getFullName=student.getFullName;
/**
 *  node 2.js 
 *  undefined undefined
 * () is missing
 */
console.log(getFullName());