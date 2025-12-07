/**
 *  command line arguments
 *  process.argv
 *
 */

/**
 *  console.log(process.argv[0]);
 *  node 1.js
 * C:\Program Files\nodejs\node.exe
 * 0-> node
 * 1-> 1.js
 */

const third = process.argv[2];
const fourth = process.argv[3];
const fifth = process.argv[4];

/**
 * node 1.js double 3
 * 6
 */
if (third == "double") {
  console.log(fourth * 2);
}

/**
 * node 1.js modulo 6 5
 * 1
 */
if (third == "modulo") {
  console.log(fourth % fifth);
}
