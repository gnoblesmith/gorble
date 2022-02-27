const ButtonRow = (props) => {
    const { onClick, letter } = props;

    const style = {
        display: "flex",
        margin: "5px",
        flexGrow: 1,
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

    return <button
        key={`keyboard-${letter}`}
        style={style}
        onClick={() => onClick(letter)}
    >
        {letter}
    </button>
}

export default ButtonRow;