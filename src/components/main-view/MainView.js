import WordRow from './word-row/WordRow';
import Keyboard from '../keyboard/Keyboard';

const MainView = (props) => {
    const { letterGrid, onKeyboardClick } = props;

    const mainViewStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "space-between"
    };

    const tableContainerStyle = {
        width: "30%",
        margin: "0 auto",
    };
    
    const tableStyle = {  
        width: "100%",
        margin: "0 auto",    
    };

    return <div style={mainViewStyle}>
        <div style={tableContainerStyle}>
            <table style={tableStyle}>
                <tbody>
                    {
                        letterGrid.map((row, index) => {
                            return <WordRow key={`word-row-${index}`} row={index+1} letterRow={row} />;
                        })
                    }
                </tbody>
            </table>
        </div>
        <Keyboard onClick={onKeyboardClick} />
    </div>
}

export default MainView;