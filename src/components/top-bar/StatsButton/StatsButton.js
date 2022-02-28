const StatsButton = (props) => {
    const { onClick } = props;

    const style = {
        width: '80px',
        display: "flex",
        justifyContent: "flex-end",
        position: "relative",
    };

    const svgStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: "28px"
    }

    return <div style={style}>
        <svg onClick={onClick} style={svgStyle} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill="white" d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"></path>
        </svg>
    </div>;
}

export default StatsButton;