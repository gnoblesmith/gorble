import LetterCell from './letter-cell/LetterCell';
import { NUM_LETTERS } from './../../../reference/constants';

const WordRow = (props) => {
    const { row, letterRow } = props;

    let columns = [];
    for (let i = 0; i < NUM_LETTERS; i++) {
        columns.push(<LetterCell
            key={`letter-cell-${i}`}
            letter={letterRow[i]} 
            row={row} 
            col={i+1} 
        />)
    }

    const style = {};

    return <tr style={style}>
        {
            columns.map(columns => columns)
        }
    </tr>
}

export default WordRow;