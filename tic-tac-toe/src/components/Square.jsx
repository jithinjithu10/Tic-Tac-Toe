import React from "react";

const Square = ({ value, onClick, isWinning }) => {
  return (
    <button
      className={`square ${value === "X" ? "x" : value === "O" ? "o" : ""} ${
        isWinning ? "winning" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
