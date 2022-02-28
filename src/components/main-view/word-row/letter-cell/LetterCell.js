
import { GuessResult } from './../../../../reference/enums';

const LetterCell = (props) => {
    const { letter } = props;

    const containerStyle = {
        margin: "2%",
        marginLeft: "2%",
        marginRight: "2%",
    };

    const background = letter.status === GuessResult.YES ? "darkolivegreen" :
                       letter.status === GuessResult.MAYBE ? "darkgoldenrod" : "black"; 

    const innerStyle = {
        border: "2px solid grey",
        height: "40px",
        width: "40px",
        lineHeight: "38px",
        textAlign: "center",
        fontSize: '30px',
        background 
    };

    return <div style={containerStyle}>
        <div style={innerStyle}>
            { letter.value }
        </div>
    </div>
}

export default LetterCell;