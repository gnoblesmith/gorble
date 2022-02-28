import WordRow from './word-row/WordRow';
import Keyboard from '../keyboard/Keyboard';
import LoadingIndicator from './LoadingIndicator';

const MainView = (props) => {
    const { loading, letterGrid, onKeyboardClick } = props;

    const mainViewStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        marginTop: "20px",
    };

    const tableContainerStyle = {
        margin: "0 auto",
    };

    return <div style={mainViewStyle}>
        <LoadingIndicator loading={loading} />
        <div style={tableContainerStyle}>
            {
                letterGrid.map((row, index) => {
                    return <WordRow key={`word-row-${index}`} row={index+1} letterRow={row} />;
                })
            }
        </div>
        <Keyboard onClick={onKeyboardClick} />
    </div>
}

export default MainView;