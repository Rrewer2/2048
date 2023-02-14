// const filteredRow = [[2, 4], [4], [2], [2, 2, 2, 2]];
// const command = "down";
// const row = [];
// const condition = command === "left" || command === "down";
// const start = condition ? 0 : filteredRow.length - 1;
// const finish = condition ? filteredRow.length : -1;
// const jj = condition ? 1 : -1;
// console.log(start, finish, jj, finish * jj);
// for (let i = start; i < finish * jj; i + jj) {
//     //3 -1 -1 1
//     console.log(i + jj);
//     console.log("i", i, i * jj, finish * jj);
//     if (filteredRow[i] === filteredRow[i + jj]) {
//         condition
//             ? row.push(filteredRow[i] * 2)
//             : row.unshift(filteredRow[i] * 2);
//         i += jj;
//     } else {
//         condition ? row.push(filteredRow[i]) : row.unshift(filteredRow[i]);
//     }
// }
// console.log(row);
// // for (let i = 0; i < filteredRow.length; i++) {
// //     if (filteredRow[i] === filteredRow[i + 1]) {
// //         row.push(filteredRow[i] * 2);
// //         i++;
// //     } else {
// //         row.push(filteredRow[i]);
// //     }
// // }
// // return row;
// // {
// //     const unshiftedRow = [];
// //     for (let i = filteredRow.length - 1; i > -1; i--) {
// //         if (filteredRow[i] === filteredRow[i - 1]) {
// //             unshiftedRow.unshift(filteredRow[i] * 2);
// //             i--;
// //         } else {
// //             unshiftedRow.unshift(filteredRow[i]);
// //         }
// //     }
// //     return unshiftedRow;
// // }
