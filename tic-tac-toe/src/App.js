import React, { useState } from 'react';
import './App.css';
import Confetti from 'react-confetti';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winnerSymbol = calculateWinner(board);

  const startGame = () => {
    if (player1Name && player2Name) {
      setGameStarted(true);
    }
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <div className="name-input-form">
          <h2>Enter Player Names</h2>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Player 1 Name" 
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Player 2 Name" 
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)} 
            />
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="game">
            {winnerSymbol && <Confetti />}
            <h1>Tic Tac Toe</h1>
            <div className="player-info">
              <div className="player player-1">
                <span>{player1Name}</span>
              </div>
              <div className="player player-2">
                <span>{player2Name}</span>
              </div>
            </div>
            <div className="board">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className={`cell ${cell} ${winnerSymbol && cell === winnerSymbol ? `highlight-winner` : ''}`}
                  onClick={() => handleClick(index)}
                >
                  {cell}
                </div>
              ))}
            </div>
            {winnerSymbol && <h2 className="winner-announcement">{winnerSymbol} Wins!</h2>}
            <button onClick={() => window.location.reload()}>Restart Game</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
