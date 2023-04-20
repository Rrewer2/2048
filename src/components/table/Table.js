import { useState } from "react";
import ddd from "../row/row";
import Grid from "../grid/Grid";
import "./Table.css";

const Table = () => {
    const [array, setArray] = useState(initArray());
    const [status, setStatus] = useState("new");
    const [wait, setWait] = useState(false);

    const handleKeyDown = ({ code }) => {
        if (!keyIncludes(code) || wait) return;
        const newArr = ddd(renameCommand(code), array);
        if (status === "new") {
            setArray(firstInit(newArr));
            return setStatus(true);
        }
        if (!compareArrays(array, newArr)) {
            setArray(newArr);
            setWait(true);
        } else setWait(false);
    };
    const transEnd = () => {
        if (wait) {
            const normed = normalize(array);
            setArray(normed);
            const empties = emptiesFromArray(normed);
            const replacedArr = replaceElem(normed);
            setArray(replacedArr);
            if (empties.length === 1) {
                if (verifyArray(replacedArr)) {
                    alert("FUCK UP!!!");
                    setStatus(false);
                }
            }
        }
        setWait(false);
    };
    const abn = () => console.log("");

    return (
        <div
            className="grid"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onTransitionEnd={transEnd}
            onAnimationEnd={abn}
        >
            <Grid array={array} />
        </div>
    );
};

export default Table;

const keyIncludes = (key) =>
    [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "Enter",
    ].includes(key);
const renameCommand = (str) => {
    if (["ArrowUp", "KeyW"].includes(str)) return "up";
    if (["ArrowDown", "KeyS"].includes(str)) return "down";
    if (["ArrowLeft", "KeyA"].includes(str)) return "left";
    if (["ArrowRight", "KeyD"].includes(str)) return "right";
    if (str === "Enter") return "new";
};
const initArray = () =>
    Array.from(Array(16), (_, i) => ({
        id: i,
        value: 2 ** (i + 1),
        x: i % 4,
        y: Math.floor(i / 4),
    }));
const firstInit = (array) => replaceElem(replaceElem(array));
const replaceElem = (array) => {
    const ID = randomEmptyElem(array).id;
    return array.map(({ id, value, ...args }) => ({
        id,
        ...args,
        value: id === ID ? get4or2() : value,
        showed: id === ID,
    }));
};
const get4or2 = () => [4, 2][Math.round(Math.random() + 0.2)];
const randomEmptyElem = (arr) => {
    const empties = emptiesFromArray(arr);
    return empties[randomIndex(empties.length)];
};
const randomIndex = (length) => Math.round(Math.random() * (length - 1));
const emptiesFromArray = (arr) => arr.filter(({ value }) => !value);
const compareArrays = (a1, a2) =>
    a1.every(
        ({ id, x, y }, i) => x === a2[i].x && y === a2[i].y && id === a2[i].id
    );
const verifyArray = (arr) => {
    const up = ddd("up", arr);
    const down = ddd("down", arr);
    const left = ddd("left", arr);
    const right = ddd("right", arr);
    return (
        compareArrays(up, arr) &&
        compareArrays(down, arr) &&
        compareArrays(left, arr) &&
        compareArrays(right, arr)
    );
};
const normalize = (A1) => {
    const A2 = Array.from(Array(16), (_, i) => ({
        id: i,
        x: i % 4,
        y: Math.floor(i / 4),
    }));
    const exist = A1.filter(({ value }) => value);
    // console.log(exist);
    const check = [];
    const result = exist
        .map(({ id, value, x, y }) => {
            const res = exist.filter(({ x: X, y: Y }) => x === X && y === Y);
            // console.log(res);
            if (res.length === 1) return { id, value, x, y };
            if (check.some((el) => el?.x === x && el?.y === y))
                return { id, value: 0, x, y };
            check.push({ x, y });
            return { id, value: value * 2, x, y, merged: true };
        })
        .filter(({ value }) => value);
    // console.log("result", result);
    const ids = result.map(({ id }) => id);
    // console.log(ids);
    function* III(ids) {
        for (let i = 0; i < 16; i++) {
            if (!ids.includes(i)) yield i;
        }
    }
    const i = III(ids);
    const uuu = A2.map(({ x, y }) => {
        const inRes = result.find((el) => el?.x === x && el?.y === y);
        return inRes ? inRes : { id: i.next().value, value: 0, x, y };
    });
    // console.log(uuu);
    return uuu.sort(({ id }, { id: ID }) => id - ID);
};
