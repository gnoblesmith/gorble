const KeyboardButtonRow = (props) => {
    const { children } = props;

    const style = {
        display: "flex",
        flexDirection: "row",
        alignItem: "stretch",
    };

    return <div style={style}>
        { children }
    </div>
}

export default KeyboardButtonRow;