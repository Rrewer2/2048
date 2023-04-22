import "./Start.css";

const Start = ({ status, handleKeyDown }) => (
    <div className={status === 1 ? "hidden" : "start flex-center"}>
        {!status ? (
            <h1 className="start-title">Do You want to try again?</h1>
        ) : null}
        <button
            className="start-btn"
            onClick={() => handleKeyDown({ code: "Enter" })}
            onKeyDown={handleKeyDown}
        >
            Start Game
        </button>
    </div>
);

export default Start;
