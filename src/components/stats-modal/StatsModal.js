import { getGamesWon } from "./../../metagame-state/metagame-state";

const StatsModal = (props) => {
    const { metagameData, onClose } = props;
    const style = {
        position: "fixed",
        width: "80%",
        height: "50%",
        backgroundColor: "black",
        border: "1px solid grey",
        borderRadius: "5px",

        left: "50%",
        transform: "translateX(-50%)",

        marginTop: "10%",
        backgroundColor: "rgba(0,0,0,0.9)",
    };

    const buttonStyle = {
        float: "right",
        
        backgroundColor: "rgba(0,0,0,1)",
        color: "white",
        marginRight: "8px",
        marginTop: "8px",
        fontWeight: 900
    };

    console.log(metagameData.history);
    return <div style={style}>
        <button style={buttonStyle} onClick={onClose}>X</button>
        Games Played: {Object.keys(metagameData.history).length} <br />
        Games Won: { getGamesWon(metagameData)}
    </div>
}

export default StatsModal;