function test() {
  console.log(number); //ReferenceError: Cannot access 'number' before initialization
}

test();
let number = 11;
