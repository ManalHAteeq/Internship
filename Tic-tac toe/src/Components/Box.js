import React from 'react'
import './Box.css'

export default function Box({value, onClick}) {
    const boxstyle = value === "X" ? "box x" : "box o";
console.log(boxstyle)
  return (
    <button className={boxstyle} onClick={onClick}>{value}</button>
  )
}
