const getArray = (command, array) => {
    if (command === "start") {
        const newArr = Array.from(Array(4), () => new Array(4).fill(0));
        const [x1, y1] = getRandomIndexOfArray();
        newArr[x1][y1] = get4or2();
        const [x2, y2] = getRandomIndexOfArray(newArr);
        newArr[x2][y2] = get4or2();
        return { array: newArr, status: true };
    }
    const workArray = ["ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(command)
        ? rotateArray(array)
        : array;
    const resArr = workArray.map((row) => {
        if (
            row.every((elem) => elem === 0) ||
            (row.every((elem) => elem > 0) && new Set(row).size === 4)
        )
            return row;
        else {
            const leftOrDown = [
                "ArrowLeft",
                "ArrowDown",
                "KeyA",
                "KeyS",
            ].includes(command);
            const filteredRow = row.filter((el) => el > 0);
            const resRow = [];
            if (filteredRow.length === 1) resRow.push(filteredRow[0]);
            else if (leftOrDown) {
                for (let i = 0; i < filteredRow.length; i++) {
                    if (filteredRow[i] === filteredRow[i + 1]) {
                        resRow.push(filteredRow[i] * 2);
                        i++;
                    } else {
                        resRow.push(filteredRow[i]);
                    }
                }
            } else {
                for (let i = filteredRow.length - 1; i >= 0; i--) {
                    if (filteredRow[i] === filteredRow[i - 1]) {
                        resRow.unshift(filteredRow[i] * 2);
                        i--;
                    } else {
                        resRow.unshift(filteredRow[i]);
                    }
                }
            }
            return leftOrDown
                ? resRow.concat(0, 0, 0).slice(0, 4)
                : [0, 0, 0].concat(resRow).slice(-4);
        }
    });
    // console.log("newArr", newArr);

    const args = getFreeSpasesFromArray(resArr);
    // console.log("args", args);
    if (args.length === 0) {
        return {
            array: array,
            status: true,
        };
    }
    if (compareArrays(array, getResArrayFromCommand(resArr, command)))
        return {
            array: array,
            status: true,
        };
    const [x, y] = args[Math.round(Math.random() * (args.length - 1))]
        .slice(-2)
        .split("");
    resArr[+x][+y] = get4or2();
    // console.log("fin", resArr);
    if (args.length === 1)
        if (verifyArray(resArr)) {
            // console.log("game over");
            return {
                array: getResArrayFromCommand(resArr, command),
                status: false,
            };
        }
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
    return ["ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(command)
        ? rotateArrayBack(arr)
        : arr;
}
function getFreeSpasesFromArray(arr) {
    return arr
        .map((row, i) =>
            row
                .map((item, j) => `${item}${i}${j}`)
                .filter((el) => +el.slice(0, -2) === 0)
        )
        .flat();
}
function verifyArray(arr) {
    const verify = [];
    verifyLoop(arr);
    verifyLoop(rotateArray(arr));
    function verifyLoop(A) {
        A.forEach((row) => {
            for (let i = 0; i < 4; i++) {
                if (row[i] === row[i + 1]) {
                    verify.push("=");
                    i++;
                }
            }
        });
    }
    return verify.length === 0;
}
