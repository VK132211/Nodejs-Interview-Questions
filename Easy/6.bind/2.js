const student = {
  firstName: "Vinay",
  talk() {
    console.log(this.firstName, "talks");
  },
};

const teacher = {
  firstName: "Alice",
};

const bound = student.talk.bind(teacher);
bound();

//Alice talks

/**
 * const newFunc = functionName.bind(objectForThis, arg1, arg2)
 * functionName.apply(objectForThis, [arg1, arg2])
 * functionName.call(objectForThis, arg1, arg2)
 */