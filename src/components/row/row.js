const ddd = (cmd, arr) => {
    if (cmd === "new") return cleanTable();
    const arrAfterMove = [];
    for (let i = 0; i < 4; i++) {
        const rowAfterMove = movedRow(rowByCommand(cmd, arr, i), cmd);
        rowAfterMove.forEach((el) => (arrAfterMove[el.id] = el));
    }
    return arr.map(({ id }) => {
        const { value, x, y } = arrAfterMove.find(({ id: ID }) => ID === id);
        return { id, value, x, y };
    });
};
export default ddd;
const movedRow = (row, cmd) => {
    const vertical = cmd === "up" || cmd === "down";
    const invert = cmd === "right" || cmd === "down";
    const rowCanMoved = row.map(canMoved);
    if (rowCanMoved.every((el) => !el)) return row;
    const passiveMove = row.map(({ id, value, x, y }, i) => {
        const offset = invert ? rowCanMoved[i] : -rowCanMoved[i];
        const index = (vertical ? y : x) + offset;
        const elem = {
            id,
            value,
            x: !vertical ? index : x,
            y: vertical ? index : y,
        };
        return elem;
    });
    return passiveMove;
};
function canMoved({ value: VALUE }, index, array) {
    if (!VALUE) return 0;
    if (index === 0) return 0;
    const slicedRow = array.slice(0, index);
    const existRow = slicedRow.filter(({ value }) => value);
    const existLength = existRow.length;
    const passiveMove =
        existLength > 1 &&
        existRow.some(({ value }, j, arr) => value === arr[j - 1]?.value);
    const activeMove =
        existRow.at(-1)?.value === VALUE &&
        (existRow.at(-2)?.value !== existRow.at(-1)?.value ||
            existRow.at(-3)?.value === existRow.at(-2)?.value);
    const emptyMove = slicedRow.filter(({ value }) => !value).length;
    return +activeMove + +passiveMove + emptyMove;
}
const rowByCommand = (cmd, A, index) => {
    const rowByIndex = (A, index) => A.filter(({ y }) => y === index);
    const columnByIndex = (A, index) => A.filter(({ x }) => x === index);
    if (cmd === "up")
        return columnByIndex(A, index).sort(({ y }, { y: Y }) => y - Y);
    if (cmd === "down")
        return columnByIndex(A, index).sort(({ y }, { y: Y }) => Y - y);
    if (cmd === "left")
        return rowByIndex(A, index).sort(({ x }, { x: X }) => x - X);
    if (cmd === "right")
        return rowByIndex(A, index).sort(({ x }, { x: X }) => X - x);
};
const cleanTable = () =>
    Array.from(Array(16), (_, i) => ({
        id: i,
        value: 0,
        x: i % 4,
        y: Math.floor(i / 4),
    }));
