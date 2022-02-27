import KeyboardButtonRow from './KeyboardButtonRow';
import KeyboardButton from './KeyboardButton';

const Keyboard = (props) => {
    const { onClick } = props;

    const style = {
        display: "flex",
        flexDirection: "column",
        height: "200px",
        width: "25%",
        margin: "0 auto",
        justifyContent: "center",
    };

    return <div style={style}>
        <KeyboardButtonRow>
            <KeyboardButton onClick={onClick} letter={'Q'} />
            <KeyboardButton onClick={onClick} letter={'W'} />
            <KeyboardButton onClick={onClick} letter={'E'} />
            <KeyboardButton onClick={onClick} letter={'R'} />
            <KeyboardButton onClick={onClick} letter={'T'} />
            <KeyboardButton onClick={onClick} letter={'Y'} />
            <KeyboardButton onClick={onClick} letter={'U'} />
            <KeyboardButton onClick={onClick} letter={'I'} />
            <KeyboardButton onClick={onClick} letter={'O'} />
            <KeyboardButton onClick={onClick} letter={'P'} />
        </KeyboardButtonRow>
        <KeyboardButtonRow>
            <KeyboardButton onClick={onClick} letter={'A'} />
            <KeyboardButton onClick={onClick} letter={'S'} />
            <KeyboardButton onClick={onClick} letter={'D'} />
            <KeyboardButton onClick={onClick} letter={'F'} />
            <KeyboardButton onClick={onClick} letter={'G'} />
            <KeyboardButton onClick={onClick} letter={'H'} />
            <KeyboardButton onClick={onClick} letter={'J'} />
            <KeyboardButton onClick={onClick} letter={'J'} />
            <KeyboardButton onClick={onClick} letter={'K'} />
            <KeyboardButton onClick={onClick} letter={'L'} />
        </KeyboardButtonRow>
        <KeyboardButtonRow>
            <KeyboardButton onClick={() => onClick('enter')} letter={'ENTER'} />
            <KeyboardButton onClick={onClick} letter={'Z'} />
            <KeyboardButton onClick={onClick} letter={'X'} />
            <KeyboardButton onClick={onClick} letter={'C'} />
            <KeyboardButton onClick={onClick} letter={'V'} />
            <KeyboardButton onClick={onClick} letter={'B'} />
            <KeyboardButton onClick={onClick} letter={'N'} />
            <KeyboardButton onClick={onClick} letter={'M'} />
            <KeyboardButton onClick={() => onClick('backspace')} letter={'BACK'} />
        </KeyboardButtonRow>
    </div>
}

export default Keyboard;