export const keyIncludes = (key) =>
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
export const firstInit = (array) => addNewElem(addNewElem(array));
export const addNewElem = (array) => {
    const ID = randomEmptyElem(array)?.id;
    return array.map(({ id, value, showed, ...args }) => ({
        id,
        ...args,
        value: id === ID ? get4or2() : value,
        showed: showed || id === ID,
    }));
};
const get4or2 = () => [4, 2][Math.round(Math.random() + 0.2)];
const randomEmptyElem = (arr) => {
    const empties = arrayEmpties(arr);
    return empties[randomIndex(empties.length)];
};
const randomIndex = (length) => Math.round(Math.random() * (length - 1));
export const arrayEmpties = (arr) => arr.filter(({ value }) => !value);
const finded = (a, A) => (obj) => obj[a] === A;
const sorted = (A, a, n) => A.sort((O1, O2) => (n ? 1 : -1) * (O1[a] - O2[a]));
const mapped = (key) => (object) => object[key];
export const find2048 = (A) => A.some(({ value }) => value > 2047);
export const compareArrays = (a1, a2) =>
    a1.every(
        ({ id, x, y, value }, i) =>
            x === a2[i].x &&
            y === a2[i].y &&
            id === a2[i].id &&
            value === a2[i].value
    );
export const normalize = (A) => {
    const exist = A.filter(mapped("value"));
    const check = [];
    const result = exist
        .map(({ id, value, x, y }) => {
            const res = exist.filter(({ x: X, y: Y }) => x === X && y === Y);
            if (res.length === 1) return { id, value, x, y };
            if (check.some((el) => el?.x === x && el?.y === y))
                return { id, value: 0, x, y };
            check.push({ x, y });
            return { id, value: value * 2, x, y, merged: true };
        })
        .filter(mapped("value"));
    const ids = result.map(mapped("id"));
    function* getId(ids) {
        for (let i = 0; i < 16; i++) {
            if (!ids.includes(i)) yield i;
        }
    }
    const i = getId(ids);
    const normedArr = fillField(0).map(({ x, y, value }) => {
        const inRes = result.find((el) => el?.x === x && el?.y === y);
        return inRes ? inRes : { id: i.next().value, value, x, y };
    });
    return sorted(normedArr, "id", true);
};
export const verifyArray = (A) => {
    const verifyLoop = (A, cmd) => {
        let count = 0;
        for (let i = 0; i < 4; i++) {
            const row = rowByCommand(cmd, A, i);
            // eslint-disable-next-line no-loop-func
            row.forEach((el, i, arr) => {
                if (i === 3) return;
                if (el.value === arr[i + 1].value) count++;
            });
        }
        return count;
    };
    return verifyLoop(A, "up") + verifyLoop(A, "left") === 0;
};
export const getArrayAfterMove = (command, arr) => {
    const cmd = renameCommand(command);
    if (cmd === "new") return fillField();
    const arrAfterMove = [];
    for (let i = 0; i < 4; i++) {
        const rowAfterMove = movedRow(rowByCommand(cmd, arr, i), cmd);
        rowAfterMove.forEach((el) => (arrAfterMove[el.id] = el));
    }
    return arr.map(({ id }) => {
        const { value, x, y } = arrAfterMove.find(finded("id", id));
        return { id, value, x, y };
    });
};
const movedRow = (row, cmd) => {
    const vertical = cmd === "up" || cmd === "down";
    const invert = cmd === "right" || cmd === "down";
    const rowCanMoved = row.map(canMoved);
    if (rowCanMoved.every((el) => !el)) return row;
    return row.map(({ id, value, x, y }, i) => {
        const offset = invert ? rowCanMoved[i] : -rowCanMoved[i];
        const index = (vertical ? y : x) + offset;
        return {
            id,
            value,
            x: !vertical ? index : x,
            y: vertical ? index : y,
        };
    });
};
const canMoved = ({ value: VALUE }, index, array) => {
    if (!VALUE) return 0;
    if (index === 0) return 0;
    const slicedRow = array.slice(0, index);
    const existRow = slicedRow.filter(mapped("value"));
    const existLength = existRow.length;
    const passiveMove =
        existLength > 1 &&
        existRow.some(({ value }, i, arr) => value === arr[i - 1]?.value);
    const activeMove =
        existRow.at(-1)?.value === VALUE &&
        (existRow.at(-2)?.value !== existRow.at(-1)?.value ||
            existRow.at(-3)?.value === existRow.at(-2)?.value);
    const emptyMove = arrayEmpties(slicedRow).length;
    return +activeMove + +passiveMove + emptyMove;
};
const rowByCommand = (cmd, A, index) => {
    const rowByIndex = (A, index) => A.filter(finded("y", index));
    const columnByIndex = (A, index) => A.filter(finded("x", index));
    return cmd === "up" || cmd === "down"
        ? sorted(columnByIndex(A, index), "y", cmd === "up")
        : sorted(rowByIndex(A, index), "x", cmd === "left");
};
export const fillField = (a = 0) =>
    Array.from(Array(16), (_, i) => ({
        id: i,
        value: a < 0 ? 2 ** (i + 1) : a,
        x: i % 4,
        y: Math.floor(i / 4),
        showed: a < 0,
    }));
export const xyFromTouches = (touches) => [
    touches[0].clientX,
    touches[0].clientY,
];
export const commandByTouch = (touchStart, touchEnd) => {
    const diff = 40;
    const Xdif = touchStart[0] - touchEnd[0];
    const Ydif = touchStart[1] - touchEnd[1];
    if (Xdif <= diff && Xdif >= -diff && Ydif <= diff && Ydif >= -diff)
        return null;
    const vertical = Math.abs(Xdif) < Math.abs(Ydif);
    return vertical
        ? Ydif > diff
            ? "ArrowUp"
            : "ArrowDown"
        : Xdif > diff
        ? "ArrowLeft"
        : "ArrowRight";
};
