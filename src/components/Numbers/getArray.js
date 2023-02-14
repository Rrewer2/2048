const getArray = (command, array) => {
    if (command === "start") {
        const newArr = Array.from(Array(4), () => new Array(4).fill(0));
        const [x1, y1] = getRandomIndexOfArray();
        newArr[x1][y1] = get4or2();
        const [x2, y2] = getRandomIndexOfArray(newArr);
        newArr[x2][y2] = get4or2();
        // console.log(x1, y1, x2, y2);
        // console.log(x1 === x2 && y1 === y2);
        return { array: newArr, status: true };
    }
    const workArray =
        command === "up" || command === "down" ? rotateArray(array) : array;
    // if (command === "up" || command === "down") array = rotateArray(array);
    const newArr = workArray.map((row) => {
        if (
            row.every((elem) => elem === 0) ||
            (row.every((elem) => elem > 0) && new Set(row).size === 4)
        )
            return row;
        else {
            const filteredRow = row.filter((el) => el > 0);
            // console.log("+", filteredRow);
            if (filteredRow.length === 1) return filteredRow;
            if (command === "left" || command === "down") {
                const pushedRow = [];
                for (let i = 0; i < filteredRow.length; i++) {
                    if (filteredRow[i] === filteredRow[i + 1]) {
                        pushedRow.push(filteredRow[i] * 2);
                        i++;
                    } else {
                        pushedRow.push(filteredRow[i]);
                    }
                }
                return pushedRow;
            } else {
                const unshiftedRow = [];
                for (let i = filteredRow.length - 1; i >= 0; i--) {
                    if (filteredRow[i] === filteredRow[i - 1]) {
                        unshiftedRow.unshift(filteredRow[i] * 2);
                        i--;
                    } else {
                        unshiftedRow.unshift(filteredRow[i]);
                    }
                }
                return unshiftedRow;
            }
        }
    });
    // console.log("newArr", newArr);

    const resArr = newArr.map((row) => {
        if (command === "left" || command === "down")
            return row.concat(0, 0, 0).slice(0, 4);
        else return [0, 0, 0].concat(row).slice(-4);
    });
    // console.log("resArr", resArr);

    if (compareArrays(array, getResArrayFromCommand(resArr, command)))
        return {
            array: array,
            status: true,
        };
    const args = getFreeSpasesFromArray(resArr);
    // console.log("args", args);
    if (args.length === 0)
        return {
            array: getResArrayFromCommand(resArr, command),
            status: false,
        };
    const [x, y] = args[Math.round(Math.random() * (args.length - 1))]
        .slice(-2)
        .split("");
    resArr[+x][+y] = get4or2();
    // console.log("fin", resArr);
    return {
        array: getResArrayFromCommand(resArr, command),
        status: true,
    };
};

export default getArray;

function getRandomIndexOfArray(arr = null) {
    if (!arr)
        return [Math.round(Math.random() * 3), Math.round(Math.random() * 3)];
    else {
        const args = getFreeSpasesFromArray(arr);
        const [x, y] = args[Math.round(Math.random() * (args.length - 1))]
            .slice(-2)
            .split("");
        return [+x, +y];
    }
}
function get4or2() {
    return [4, 2][Math.round(Math.random() + 0.2)]; ///////!!!!!!!!!!!!!!!!
}
function compareArrays(a1, a2) {
    const fg = a1.map((el1, i) => el1.every((el2, j) => el2 === a2[i][j]));
    // console.log(fg.every((item) => item === true));
    return fg.every((item) => item === true);
}
function rotateArray(arr) {
    const res = [];
    for (let x = 0; x < 4; x++) {
        let row = [];
        for (let y = 3, z = 0; y >= 0; y--, z++) {
            row[z] = arr[y][x];
        }
        res[x] = row;
    }
    return res;
}
function rotateArrayBack(arr) {
    const res = [];
    for (let x = 0; x < 4; x++) {
        let row = [];
        for (let y = 3; y >= 0; y--) {
            row[y] = arr[y][3 - x];
        }
        res[x] = row;
    }
    return res;
}
function getResArrayFromCommand(arr, command) {
    return command === "up" || command === "down" ? rotateArrayBack(arr) : arr;
}
function getFreeSpasesFromArray(arr) {
    return arr
        .map((row, i) => row.map((item, j) => `${item}${i}${j}`))
        .map((row) => row.filter((el) => +el.slice(0, -2) === 0))
        .flat();
}
