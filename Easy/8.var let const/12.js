let number = 11;
function test() {
  console.log(number); //ReferenceError: Cannot access 'number' before initialization
  let number = 40;
}

test();
