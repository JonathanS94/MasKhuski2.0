import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useStyles } from "./Cronometro.style";

// forwardRef  permitir que el componente reciba una referencia externa
const Cronometro = forwardRef((props, ref) => {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Métodos pause y cosenguir el tiempo usando useImperativeHandle
  useImperativeHandle(ref, () => ({
    pause() {
      setIsActive(false);
    },
    getTime() {
      return time;
    },
  }));

  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  return <div className={classes.cronometro}>{formatTime(time)}</div>;
});

export default Cronometro;
