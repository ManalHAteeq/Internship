import './App.css';
import React, {useState} from 'react';
import { Board } from './Components/Board';
import { Score } from './Components/Score';
import { ResetButton } from './Components/ResetButton';

function App() {
  const win_cond = [ 
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ]
  
  const [board, setBoard]= useState(Array(9).fill(null));
  const [xPlaying, setXPlaying]= useState(true); 
  const [scores, setScores] = useState({xScore:0, oScore:0 })
  const [gameOver, setGameOver] = useState(false);

  const boxClick = (boxId) => { 
    const updatedBoard = board.map((value, idx) => { 
      if (idx === boxId)
      return xPlaying === true ? "X" : "O"; 
    else 
    return value; 
    })
    const winner = checkWinner(updatedBoard); 
    if (winner == "O")
    {
       let {oScore}= scores; 
       oScore+=1; 
       setScores({...scores, oScore}); 
    }
    else if(winner == "X")
     { 
      let {xScore}= scores; 
      xScore+=1; 
      setScores({...scores, xScore}); 
     }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  }

  const checkWinner= (board) => { 
    for (let i=0; i<win_cond.length ; i++)
    { 
      const [x,y,z]= win_cond[i]; 

      if(board[x] && board[x] === board[y] && board[y] === board[z])
      {
        setGameOver(true);  
        return board[x]; 
      }

    }

  }

  const resetBoard=() => { 
    setXPlaying(true);
    setGameOver(false);
    setBoard(Array(9).fill(null)); 
  }

  return (
    <div className="App">
      <Score scores={scores} xPlaying= {xPlaying}/> 
      <Board board={board} onClick={gameOver? resetBoard :boxClick}/> 
      <ResetButton resetBoard= {resetBoard} /> 
    </div>
  );
}

export default App;
