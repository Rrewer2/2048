import React, { useState, useEffect, useRef } from "react";
import getArray from "./getArray";
import "./Table.css";

const Table = () => {
    const [array, setArray] = useState([
        [2, 4, 8, 16],
        [128, 64, 32, 16],
        [128, 256, 512, 1024],
        [4096, 2048, 2048, 1024],
    ]);
    const [status, setStatus] = useState("new");
    const handleKeyDown = (event) => {
        const key = event.code;
        if (status && status !== "new") {
            if (
                [
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "KeyW",
                    "KeyA",
                    "KeyS",
                    "KeyD",
                ].includes(key)
            ) {
                const obj = getArray(key, array);
                setArray(obj.array);
                setStatus(obj.status);
            }
        } else if (key === "Enter") startNewGame();
    };
    const ref = useRef(null);

    useEffect(() => ref.current?.focus(), [status]);
    const startNewGame = () => {
        const obj = getArray("start");
        setArray(obj.array);
        setStatus(obj.status);
    };
    const plates = array.flat().map((el, i) => (
        <div
            className="Square"
            style={el === 0 ? { color: "#8b8b8b" } : null}
            key={`plates#${i}`}
        >
            <div className={`Tile coin${el}`}>{el === 0 ? "" : el}</div>
        </div>
    ));

    // for (let line of array) console.log(line);
    // console.log("render");
    const cn =
        status === "new"
            ? "Game Start-visible"
            : status
            ? "Game Start hidden"
            : "Game Start again";
    const text = !status ? <h1>Do You want to try again?</h1> : null;

    return (
        <>
            <div className={cn}>
                {text}
                <button
                    className="btn-start"
                    onClick={startNewGame}
                    onKeyDown={handleKeyDown}
                >
                    Start Game
                </button>
            </div>
            <div
                className="Game Table-visible"
                ref={ref}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                {plates}
            </div>
        </>
    );
};

export default Table;
