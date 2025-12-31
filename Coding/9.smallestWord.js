function findSmallestWordReduce(str) {
  const words = str.split(" ");
  console.log(words);
  
  const smallestWord = words.reduce((smallest, currentWord) => {
    return currentWord.length < smallest.length ? currentWord : smallest;
  }, words[0]);
  return smallestWord;
}

const sentence3 = "Google do a barrel roll";
console.log(findSmallestWordReduce(sentence3));
