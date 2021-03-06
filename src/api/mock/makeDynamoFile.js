const fs = require('fs');

const allowedGuessesList = JSON.parse(
    fs.readFileSync('./english_words_five_letters.json', {encoding:'utf8', flag:'r'})
);

let dynamoObject = { AllowedGuesses: [] }
let i = 1;
allowedGuessesList.forEach(word => {
    dynamoObject.AllowedGuesses.push({
        PutRequest: {
            Item: {
                word: word,
                id: i,
            }
        }
    });
    i++;
});

fs.writeFileSync('./allowed-guesses-for-dynamo.json', JSON.stringify(dynamoObject));
console.log("done.");