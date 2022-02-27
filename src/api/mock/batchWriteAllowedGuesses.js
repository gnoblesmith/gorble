const fs = require('fs');
const AWS = require("aws-sdk");
AWS.config.update({region:'us-east-1'});
const dynamo = new AWS.DynamoDB.DocumentClient();

const process = async () => {
    const guesses = JSON.parse(
        fs.readFileSync('./allowed-guesses-for-dynamo.json', {encoding:'utf8', flag:'r'})
    );

    const numberOfItems = guesses.AllowedGuesses.length;
    let batchNumber = 1;
    let batchSize = 25;
    let totalBatches = Math.ceil(numberOfItems / batchSize);
    let batch = { AllowedGuesses: [] };

    let index = 0;

    let unprocessedItems = [];

    while (index < numberOfItems) {
        console.log("Writing batch " + batchNumber + " of " + totalBatches + ".");

        for (let batchIndex = 0; batchIndex < batchSize; batchIndex++) {
            if (index + batchIndex < numberOfItems) {
                batch.AllowedGuesses.push(guesses.AllowedGuesses[index + batchIndex]);
            }
        }
        
        await dynamo.batchWrite({
            RequestItems: batch,
        }, (err, data) => {
            if (err) console.error(err);
            if (data.UnprocessedItems.AllowedGuesses?.length) {
                unprocessedItems.push(...data.UnprocessedItems.AllowedGuesses);
            }
        }).promise();

        batch.AllowedGuesses = [];
        index += batchSize;
        batchNumber++;
    }
    
    console.log(unprocessedItems.length + " unprocessed.");
    fs.writeFileSync('./unprocessed.json', JSON.stringify(unprocessedItems));
    console.log("done.");
}

process();



