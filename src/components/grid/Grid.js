import Square from "../square/Square";

const Grid = ({ array }) =>
    array.map((item) => (!item?.value ? null : Square(item)));

export default Grid;
