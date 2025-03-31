import BounceLoader from "react-spinners/BounceLoader";

export default function Spinner() {
    const spinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
    };
    return (
        <div style={spinnerStyle}>
            <BounceLoader data-testid="spinner" color="#4e4ffa" size={100} />
        </div>
    );
}