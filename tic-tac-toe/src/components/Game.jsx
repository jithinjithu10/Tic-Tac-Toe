import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const calculatedWinner = calculateWinner(newSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner.winner);
      setWinningSquares(calculatedWinner.squares);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], squares: [a, b, c] };
      }
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setWinningSquares([]);
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      {winner ? (
        <div className="winner">Player {winner} Wins!</div>
      ) : (
        <div className="turn">Next Player: {isXNext ? "X" : "O"}</div>
      )}
      <Board squares={squares} onClick={handleClick} winningSquares={winningSquares} />
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Game;
