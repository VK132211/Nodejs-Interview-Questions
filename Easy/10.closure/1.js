/**
 * It is a function that references varibales in the outer scope from its innerscope
 * inner function has access to the functions,varaibales,objects of it's outerscope even after the outer
 * function has returned.
 */

function message() {
  let msg = "Friday is going to be rainy";
  let type = {
    radio: "radio message",
    tv: "TV message",
  };
  function date() {
    return new Date().toString();
  }
  function weatherForecast() {
    console.log(msg);
    console.log(type.radio);
    console.log(date());
  }
  return weatherForecast;
}

let weather = message();
weather();
