import KeyboardButtonRow from './KeyboardButtonRow';
import KeyboardButton from './KeyboardButton';

const Keyboard = (props) => {
    const { onClick, letterStatuses } = props;

    const style = {
        margin: "14px auto",
        maxWidth: "500px",
    };

    const getStyle = (letter) => {
        if (!letterStatuses[letter]) return "darkgrey";
        else if (letterStatuses[letter] === "no") return "black";
        else if (letterStatuses[letter] === "maybe") return "darkgoldenrod";
        else if (letterStatuses[letter] === "yes") return "darkolivegreen"
    }

    console.log(letterStatuses);

    return <div style={style}>
        <KeyboardButtonRow>
            <KeyboardButton backgroundColor={getStyle('Q')} onClick={onClick} letter={'Q'} />
            <KeyboardButton backgroundColor={getStyle('W')} onClick={onClick} letter={'W'} />
            <KeyboardButton backgroundColor={getStyle('E')} onClick={onClick} letter={'E'} />
            <KeyboardButton backgroundColor={getStyle('R')} onClick={onClick} letter={'R'} />
            <KeyboardButton backgroundColor={getStyle('T')} onClick={onClick} letter={'T'} />
            <KeyboardButton backgroundColor={getStyle('Y')} onClick={onClick} letter={'Y'} />
            <KeyboardButton backgroundColor={getStyle('U')} onClick={onClick} letter={'U'} />
            <KeyboardButton backgroundColor={getStyle('I')} onClick={onClick} letter={'I'} />
            <KeyboardButton backgroundColor={getStyle('O')} onClick={onClick} letter={'O'} />
            <KeyboardButton backgroundColor={getStyle('P')} onClick={onClick} letter={'P'} />
        </KeyboardButtonRow>
        <KeyboardButtonRow>
            <KeyboardButton backgroundColor={getStyle('A')} onClick={onClick} letter={'A'} />
            <KeyboardButton backgroundColor={getStyle('S')} onClick={onClick} letter={'S'} />
            <KeyboardButton backgroundColor={getStyle('D')} onClick={onClick} letter={'D'} />
            <KeyboardButton backgroundColor={getStyle('F')} onClick={onClick} letter={'F'} />
            <KeyboardButton backgroundColor={getStyle('G')} onClick={onClick} letter={'G'} />
            <KeyboardButton backgroundColor={getStyle('H')} onClick={onClick} letter={'H'} />
            <KeyboardButton backgroundColor={getStyle('J')} onClick={onClick} letter={'J'} />
            <KeyboardButton backgroundColor={getStyle('K')} onClick={onClick} letter={'K'} />
            <KeyboardButton backgroundColor={getStyle('L')} onClick={onClick} letter={'L'} />
        </KeyboardButtonRow>
        <KeyboardButtonRow>
            <KeyboardButton onClick={() => onClick('enter')} letter={'ENTER'} />
            <KeyboardButton backgroundColor={getStyle('Z')} onClick={onClick} letter={'Z'} />
            <KeyboardButton backgroundColor={getStyle('X')} onClick={onClick} letter={'X'} />
            <KeyboardButton backgroundColor={getStyle('C')} onClick={onClick} letter={'C'} />
            <KeyboardButton backgroundColor={getStyle('V')} onClick={onClick} letter={'V'} />
            <KeyboardButton backgroundColor={getStyle('B')} onClick={onClick} letter={'B'} />
            <KeyboardButton backgroundColor={getStyle('N')} onClick={onClick} letter={'N'} />
            <KeyboardButton backgroundColor={getStyle('M')} onClick={onClick} letter={'M'} />
            <KeyboardButton onClick={() => onClick('backspace')} letter={'<'} />
        </KeyboardButtonRow>
    </div>
}

export default Keyboard;