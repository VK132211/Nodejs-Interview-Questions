function reverseWords(str) {
  let reversedSentence = "";
  let word = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] != " ") {
      word += str[i];
    } else {
      reversedSentence = word + " " + reversedSentence;
      word = "";
    }
  }
  reversedSentence = word + " " + reversedSentence;
  console.log(reversedSentence.trim());
}
reverseWords("The quick brown fox jumps over a lazy dog");
