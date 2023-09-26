import "./App.css";
import React, { useState, useEffect } from "react";
import { Board } from "./Components/Board";
import { Score } from "./Components/Score";
import { ResetButton } from "./Components/ResetButton";
import { Timer } from "./Components/Timer";

function App() {
  const win_cond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isTimerRunning) {
      setMinutes(0);
      setSeconds(0);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (gameOver) {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
    }
  }, [gameOver]);

  const boxClick = (boxId) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxId) return xPlaying === true ? "X" : "O";
      else return value;
    });

    const winner = checkWinner(updatedBoard);
    if (winner === "O" || winner === "X") {
      let winnerKey = winner.toLowerCase() + "Score";
      setScores((prevScores) => ({
        ...prevScores,
        [winnerKey]: prevScores[winnerKey] + 1,
      }));
      setGameOver(true);
      setIsTimerRunning(false); // Stop the timer when someone wins
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < win_cond.length; i++) {
      const [x, y, z] = win_cond[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setXPlaying(true);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setIsTimerRunning(true); // Start the timer when a new game starts
  };

  return (
    <div className="App">
      <Timer
        isRunning={isTimerRunning}
        onReset={!gameOver}
        minutes={minutes}
        seconds={seconds}
      />
      <Score scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : boxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
