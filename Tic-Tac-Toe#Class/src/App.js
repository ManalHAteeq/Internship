import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board"; // Import the Board component
import Score from "./components/Score";
import ResetButton from "./components/ResetButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      xScore: 0,
      oScore: 0,
      timer: 0,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer + 1 }));
    }, 1000);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  updateScore(winner) {
    if (winner === "X") {
      this.setState((prevState) => ({ xScore: prevState.xScore + 1 }));
    } else if (winner === "O") {
      this.setState((prevState) => ({ oScore: prevState.oScore + 1 }));
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    const winner = calculateWinner(squares);
    if (winner) {
      this.updateScore(winner);
      this.stopTimer();
    }
  }

  resetBoard() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      timer:0,
    });
  }

  render() {
    const squares = this.state.squares;
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    
    return (
      
      <div className="App">
        <Score xScore={this.state.xScore} oScore={this.state.oScore} />
        <div className="status">{status}</div>
        <div className="timer">Time: {this.formatTime(this.state.timer)}</div>
        <Board squares={squares} onClick={(i) => this.handleClick(i)} />
        <ResetButton onClick={() => this.resetBoard()} />
      </div>
    );
  }
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }

  return null;
}

export default App;
