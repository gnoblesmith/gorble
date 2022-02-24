
import { GuessResult } from './../../../../reference/enums';

const LetterCell = (props) => {
    const { letter } = props;

    const containerStyle = {
        width: "20%",
    };

    const background = letter.status === GuessResult.YES ? "darkolivegreen" :
                       letter.status === GuessResult.MAYBE ? "darkgoldenrod" : "black"; 

    const innerStyle = {
        margin: "5%",
        border: "2px solid grey",
        height: "100px",
        lineHeight: "90px",
        textAlign: "center",
        fontSize: '56px',
        background 
    };

    return <td style={containerStyle}>
        <div style={innerStyle}>
            { letter.value }
        </div>
    </td>
}

export default LetterCell;