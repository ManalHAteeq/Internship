import React, { Component } from 'react';
import './ResetButton.css'

class ResetButton extends Component {
  render() {
    return (
      <button className="reset-button" onClick={this.props.onClick}>
        Reset Board
      </button>
    );
  }
}

export default ResetButton;
