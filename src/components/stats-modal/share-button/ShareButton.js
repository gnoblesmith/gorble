const ShareButton = (props) => {
    const { onShareClick, metagameData } = props;

    const greenSquare = String.fromCodePoint(129001); // 🟩;
    const yellowSquare = String.fromCodePoint(129000); // 🟨;
    const greySquare = String.fromCodePoint(11035); // ⬛;

    const getNumGuessesToWin = (dayData) => {
        const indexOfWin = dayData.letterGrid.findIndex(row => {
            return row[0].status === "yes" &&
                row[1].status === "yes" &&
                row[2].status === "yes" &&
                row[3].status === "yes" &&
                row[4].status === "yes";
        });

        if (indexOfWin >= 0) return indexOfWin+1;
        else return indexOfWin;
    }

    const makeClipboardContent = () => {
        let clipboardContent = "";
        
        const todaysData = metagameData.history[(new Date().toDateString())];

        const guessesToWin = getNumGuessesToWin(todaysData);

        const headline = todaysData.won ? 
            `Gorble ${guessesToWin}/6` :
            `Gorble X/6`;

        clipboardContent = `${headline}\n\n`;

        const numberOfLines = guessesToWin > 0 ? guessesToWin : 6;

        for (let i = 0; i < numberOfLines; i++) {
            const line = todaysData.letterGrid[i];

            line.forEach((cell) => {
                if (cell.status === 'yes') {
                    clipboardContent = `${clipboardContent}${greenSquare}`;
                } else if (cell.status === 'maybe') {
                    clipboardContent = `${clipboardContent}${yellowSquare}`;
                } else {
                    clipboardContent = `${clipboardContent}${greySquare}`;
                }
            })
            clipboardContent = `${clipboardContent}\n`;
        }

        return clipboardContent;
    }

    const onClick = () => {
        navigator.clipboard.writeText(makeClipboardContent());
        onShareClick();
    }

    const style = {
        display: "block",
    };

    return <button style={style} onClick={onClick}>
        Share
    </button>
}

export default ShareButton;
