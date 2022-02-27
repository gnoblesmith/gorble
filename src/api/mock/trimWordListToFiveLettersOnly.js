const fs = require('fs');

const words = Object.keys(JSON.parse(
    fs.readFileSync('./all_english_words.json', {encoding:'utf8', flag:'r'})
));
const wordsWithOnlyFiveLetters = [];

for (let i = 0; i < words.length; i++) {
    if (words[i].length === 5) {
        wordsWithOnlyFiveLetters.push(words[i]);
    }

    if (i%100 == 0) {
        console.log(i + " of " + words.length + " complete.");
    }
}

console.log("writing result to english_words_five_letters.json");
fs.writeFileSync('./english_words_five_letters.json', JSON.stringify(wordsWithOnlyFiveLetters));
