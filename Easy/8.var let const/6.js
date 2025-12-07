function test() {
  console.log(number); //ReferenceError: Cannot access 'number' before initialization
  let number = 11;
}

test();
