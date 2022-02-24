import WordRow from './word-row/WordRow';
import { useState } from 'react';
import { NUM_GUESSES } from './../../reference/constants';

const MainView = (props) => {
    const { letterGrid } = props;
    const [wordsGuessed, setWordsGuessed] = useState(() => new Array(NUM_GUESSES).fill(''));

    const style = {
        width: "60%", 
        height: "100%",
        marginLeft: "20%",
        marginRight: "20%",
    };

    return <div>
        <table style={style}>
            <tbody>
                {
                    letterGrid.map((row, index) => {
                        return <WordRow key={`word-row-${index}`} row={index+1} letterRow={row} />;
                    })
                }
            </tbody>
        </table>
    </div>
}

export default MainView;