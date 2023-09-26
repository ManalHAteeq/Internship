import React, { Component } from 'react';
import './Score.css'

class Score extends Component {
  render() {
    return (
      <div className="score-board">
        <p> X = {this.props.xScore}</p>
        <p className='o-score'> O = {this.props.oScore}</p>
      </div>
    );
  }
}

export default Score;
