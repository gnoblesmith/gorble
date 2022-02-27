import StatsButton from './stats/StatsButton';

const TopBar = () => {
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
        <StatsButton />
    </div>
}

export default TopBar;