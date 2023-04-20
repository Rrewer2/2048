import Square from "../Square/Square";

const Grid = ({ array }) =>
    array.map((item) => (!item?.value ? null : Square(item)));

export default Grid;
