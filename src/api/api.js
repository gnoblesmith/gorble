import { wordsWithFiveLetters } from './mock/words';
let answer = 'aaaaa';

export const initializeWord = () => {
    answer = wordsWithFiveLetters[Math.floor(Math.random()*wordsWithFiveLetters.length)];
    console.log("the word is", answer);
}

export const checkWordValidity = (guess) => {
    return new Promise(resolve => {
        resolve(wordsWithFiveLetters.filter(w => w.toLowerCase() === guess.toLowerCase()).length);
    });
}

export const checkWord = (guess) => {
    return new Promise(resolve => {
        let result = [];
        for (let i = 0; i < answer.length; i++) {
            const guessLetter = guess.charAt(i).toLowerCase();
            const answerLetter = answer.charAt(i).toLowerCase();

            if (answerLetter === guessLetter) {
                result.push("yes");
            } else if (answer.indexOf(guessLetter) >= 0) {
                // this part is actually more complex with multiples... todo
                result.push("maybe");
            } else {
                result.push("no");
            }
        }

        resolve(result);
    });
}
