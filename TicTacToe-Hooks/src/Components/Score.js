import React from 'react'
import './Score.css'

export const Score = ({scores, xPlaying}) => {
    const {xScore, oScore} = scores; 
  return (
    <div className='score-board'>
       <span className={`score x-score ${!xPlaying && "inactive"}`}> 
        X - {xScore}
       </span>
       <span className={`score o-score ${xPlaying && "inactive"}`}> 
        O - {oScore}
        </span>

    </div>
  )
}
