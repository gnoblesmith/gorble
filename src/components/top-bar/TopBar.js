import StatsButton from './StatsButton/StatsButton';

const TopBar = (props) => {
    const { onStatsButtonClicked } = props;

    const style = {
        display: "flex",
        flex: "0 1 auto",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        width: "100%", 
        textAlign: "center",
        fontSize: '60px',
        fontFamily: "Arial, sans-serif",
        borderBottom: "2px solid grey"
    };

    return <div style={style}>
        <div style={{width: '80px'}}></div>
        Gorble
        <StatsButton onClick={onStatsButtonClicked} />
    </div>
}

export default TopBar;