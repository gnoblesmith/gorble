import "./LoadingIndicator.css";

const LoadingIndicator = (props) => {
    const { loading } = props;

    const style = {
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2,
    };

    return loading ? <div style={style}>
        <div className="spinner" />
    </div> : null;
}

export default LoadingIndicator;