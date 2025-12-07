function counter() {
  for (var i = 1; i <= 3; i++) {
    console.log(`i is ${i} outside of setTimeout`);
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}
// var has function scope
counter();

/**
i is 1 outside of setTimeout
i is 2 outside of setTimeout
i is 3 outside of setTimeout
4
4
4
 */