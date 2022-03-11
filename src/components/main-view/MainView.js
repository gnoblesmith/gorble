import WordRow from './word-row/WordRow';
import Keyboard from '../keyboard/Keyboard';
import LoadingIndicator from './LoadingIndicator';

const MainView = (props) => {
    const { loading, letterGrid, onKeyboardClick, keyboardLetterStatuses } = props;

    const mainViewStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        marginTop: "20px",
        outline: "none",
    };

    const tableContainerStyle = {
        margin: "0 auto",
    };

    const onKeyDown = (e) => {
        onKeyboardClick(e.key.toLowerCase());
    };

    return <div style={mainViewStyle} onKeyDown={onKeyDown} tabIndex="0">
        <LoadingIndicator loading={loading} />
        <div style={tableContainerStyle}>
            {
                letterGrid.map((row, index) => {
                    return <WordRow key={`word-row-${index}`} row={index+1} letterRow={row} />;
                })
            }
        </div>
        <Keyboard letterStatuses={keyboardLetterStatuses} onClick={onKeyboardClick} />
    </div>
}

export default MainView;