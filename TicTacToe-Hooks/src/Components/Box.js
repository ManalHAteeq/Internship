import React from 'react'
import './Box.css'

export default function Box({value, onClick}) {
    const boxstyle = value === "X" ? "box x" : "box o";
  return (
    <button className={boxstyle} onClick={onClick}>{value}</button>
  )
}
