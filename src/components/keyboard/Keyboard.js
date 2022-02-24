const Keyboard = (props) => {
    const { onClick } = props;

    const style = {
        flex: "0 1 150px",
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
    };

    const allLetters = 'abcdefghijklmnopqrstuvwxyz';

    let letterKeys = [];
    for (let i = 0; i < allLetters.length; i++) {
        letterKeys.push(<button key={`keyboard-${allLetters.charAt(i)}`} onClick={() => onClick(allLetters.charAt(i))}>{allLetters.charAt(i).toUpperCase()}</button>)
    } 

    return <div>
        <button onClick={() => onClick('enter')}>Enter</button>
        <button onClick={() => onClick('backspace')}>Backspace</button>
        { letterKeys.map(letterKeys => letterKeys) }
    </div>
}

export default Keyboard;