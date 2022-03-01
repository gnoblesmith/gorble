const ButtonRow = (props) => {
    const { onClick, letter } = props;

    const style = {
        display: "flex",
        marginTop: "2px",
        marginLeft: "2px",
        marginRight: "2px",
        marginBottom: "2px",
        flexGrow: 0,
        height: "40px",
        backgroundColor: "darkgrey",
        color: "white",
        borderRadius: "4px",
        borderColor: "darkgrey",
        borderStyle: "solid",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
    };

    if (letter.toLowerCase() === 'a') style.marginLeft = '18px';
    if (letter.toLowerCase() === 'l') style.marginRight = '18px';
    if (letter.toLowerCase() != 'enter' && letter.toLowerCase() != 'backspace') style.width = "29px";

    return <button
        key={`keyboard-${letter}`}
        style={style}
        onClick={() => onClick(letter)}
    >
        {letter}
    </button>
}

export default ButtonRow;