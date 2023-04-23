import Square from "../square/Square";
import { fillField } from "../../services/functions";

const List = () =>
    fillField(1).map((item) => Square(item));

export default List;
