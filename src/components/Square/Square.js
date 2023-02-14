import React from "react";
import "./Square.css";

const Square = () => {
    const squares = new Array(16).fill("").map((item, i) => {
        return <div className="squares" key={`squares#${i}`}></div>;
    });
    // console.log(squares);
    return <div className="Square">{squares}</div>;
};
export default Square;
