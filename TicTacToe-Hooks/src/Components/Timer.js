import React, { useEffect, useState } from "react";
import "./Timer.css";

export const Timer = ({ isRunning, onReset }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [seconds, isRunning]);

  useEffect(() => {
    if (onReset) {
      setMinutes(0);
      setSeconds(0);
    }
  }, [onReset]);

  return (
    <div className="container">
      <div className="time-container">
        <h1>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </h1>
      </div>
    </div>
  );
};
