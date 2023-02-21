import { useState, useEffect, useRef } from "react";
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

    const [touchStart, setTouchStart] = useState([0, 0]);
    const [touchEnd, setTouchEnd] = useState([0, 0]);

    function handleTouchStart(event) {
        setTouchStart([event.touches[0].clientX, event.touches[0].clientY]);
    }

    function handleTouchMove(event) {
        setTouchEnd([event.touches[0].clientX, event.touches[0].clientY]);
    }

    function handleTouchEnd() {
        const Xdif = touchStart[0] - touchEnd[0];
        const Ydif = touchStart[1] - touchEnd[1];
        const condition = Math.abs(Xdif) > Math.abs(Ydif);
        const diff = 40;
        const command =
            Xdif > diff && condition
                ? { code: "ArrowLeft" }
                : Xdif < -diff && condition
                ? { code: "ArrowRight" }
                : Ydif > diff && !condition
                ? { code: "ArrowUp" }
                : Ydif < -diff && !condition
                ? { code: "ArrowDown" }
                : null;
        if (command) handleKeyDown(command);
    }
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
    const squares = array.flat().map((el, i) => (
        <div className="Square" key={`squares#${i}`}>
            <div className={getClassName(el)}>{el === 0 ? "" : el}</div>
        </div>
    ));

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
                {squares}
            </div>
            <div
                className="overlay"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />
        </>
    );
};

export default Table;

function getClassName(el) {
    if (el > 65) {
        if (el > 513) {
            if (el > 2049) return `Tile coinmax fourth`;
            return `Tile coin${el} fourth`;
        }
        return `Tile coin${el} third`;
    }
    return `Tile coin${el}`;
}
