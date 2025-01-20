import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, winningSquares }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinning={winningSquares.includes(index)} // Apply winning class if part of the winning combination
        />
      ))}
    </div>
  );
};

export default Board;
