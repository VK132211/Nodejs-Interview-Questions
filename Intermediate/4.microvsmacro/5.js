console.log("First line");
// Notice setTimeout time is 0
setTimeout(function () {
  console.log("From setTimeout");
}, 0);

// Notice we resolve the promise immediately so the callback function executes immediately
Promise.resolve("Resolved promise").then(function (data) {
  // data is equal to the "Resolved promise"
  console.log(data);
});
