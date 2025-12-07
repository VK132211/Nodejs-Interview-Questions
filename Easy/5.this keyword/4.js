console.log(this); // module.exports
module.exports.nickName = "vk";
console.log(this);
global.age = 40;
function hi() {
  console.log(this.age);
}

hi();

// this keyword refers to module.exports object
// this keyword inside a named functions refers to global object
/**
 * {}
{ nickName: 'vk' }
40
 */