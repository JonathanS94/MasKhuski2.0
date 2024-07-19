import React, { useState, useEffect } from "react";
import { useStyles } from "./Cronometro.style"; 

const Cronometro = () => {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const [isActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  return <div className={classes.cronometro}>{formatTime(time)}</div>;
};

export default Cronometro;
