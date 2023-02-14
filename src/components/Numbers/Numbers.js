import React, { useState } from "react";
import getArray from "./getArray";
import "./Numbers.css";

const Numbers = () => {
    const [array, setArray] = useState([]);
    const handleKeyDown = (event) => {
        // console.log(event.key);
        let obj = {};
        switch (event.key) {
            case "ArrowLeft":
                obj = getArray("left", array);
                setArray(obj.array);
                break;
            case "ArrowRight":
                obj = getArray("right", array);
                setArray(obj.array);
                break;
            case "ArrowUp":
                obj = getArray("up", array);
                setArray(obj.array);
                break;
            case "ArrowDown":
                obj = getArray("down", array);
                setArray(obj.array);
                break;
            default:
                break;
        }
    };
    const onClick = () => {
        const obj = getArray("start");
        setArray(obj.array);
    };
    const plates = array.flat().map((el, i) => (
        <div
            className="Element"
            style={el === 0 ? { color: "white" } : null}
            key={`plates#${i}`}
        >
            <div className="nums">{el}</div>
        </div>
    ));

    for (let line of array) console.log(line);
    // console.log("render");
    return (
        <div className="Square Numbers" tabIndex={0} onKeyDown={handleKeyDown}>
            <button className="btn-start" onClick={onClick}>
                Start new Game
            </button>
            <div className="Game">{plates}</div>
            {/* <div className="Element">1024</div> */}
        </div>
    );
};

export default Numbers;
