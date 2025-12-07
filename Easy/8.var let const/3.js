let x = 20;
console.log(x); //20

function test() {
  let x = 30;
  console.log(x); //30

  if (true) {
    let x = 40;
    console.log(x); // 40
  }
  console.log(x); // 30
}

test();
console.log(x); // 20
