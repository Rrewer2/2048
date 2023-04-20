import "./Square.css";
const indent = 25;
const Square = ({ id, x, y, value, merged, showed }) => (
    <div
        key={id}
        className={`square ${merged ? "merged" : ""} ${
            showed ? "showed" : ""
        } coin${value}`}
        style={{
            left: `${x * indent + 1.5}%`,
            top: `${y * indent + 1.5}%`,
        }}
    >
        <p>{value}</p>
    </div>
);

export default Square;
