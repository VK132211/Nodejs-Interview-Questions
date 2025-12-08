class Product {
  constructor(productName, id) {
    this.productName = productName;
    this.id = id;
  }
}

class Bag extends Product {
  constructor(productName, id, leatherType) {
    super(productName, id);
    this.leatherType = leatherType;
  }
}

const someBag = new Bag("Sky Bag", 123, "genuine");
console.log(someBag);
