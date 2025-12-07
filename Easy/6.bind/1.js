let dog = {
  dogName: "chicko",
  bark() {
    console.log(`${this.dogName} says bow bow`);
  },
};

var func = dog.bark;

// For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters.

// @param thisArg — The object to be used as the this object.
func = func.bind(dog);
setTimeout(func, 1000);

//undefined says bow bow
// chicko says bow bow    with bind
