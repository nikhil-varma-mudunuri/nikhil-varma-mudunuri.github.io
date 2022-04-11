import "./timer.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import stampToVal from "../../functions/stampToVal";

const Timer = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMins, setTimerMins] = useState("00");
  const [timerSecs, setTimerSecs] = useState("00");
  let interval = useRef();

  const startTimer = (countDowndate, state) => {
    if (state === 1) {
      interval = setInterval(() => {
        let k = countDowndate - Math.floor(Date.now() / 1000);
        const [days, hours, minutes, seconds] = stampToVal(k);
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMins(minutes);
        setTimerSecs(seconds);
      }, 1000);
    } else {
      const [days, hours, minutes, seconds] = stampToVal(countDowndate);
      setTimerDays(days);
      setTimerHours(hours);
      setTimerMins(minutes);
      setTimerSecs(seconds);
    }
  };

  const { contract } = useSelector((state) => state.provider);

  useEffect(() => {
    const callBack = async () => {
      if (contract) {
        const [duration, startTime, endTime] = await contract
          .getTimeLines()
          .then((res) => res.map((e) => parseInt(e)));
        const state = await contract.getState();
        console.log(duration, startTime, endTime);
        if (state < 2) {
          if (endTime === 0) {
            startTimer(duration, 0);
          } else if (endTime - startTime < 0) {
            clearInterval(interval.current);
          } else {
            startTimer(endTime, 1);
          }
        }
      } else {
        clearInterval(interval.current);
        setTimerDays("00");
        setTimerHours("00");
        setTimerMins("00");
        setTimerSecs("00");
      }
    };
    callBack();
  }, [contract]);

  return (
    <div className="timer-container">
      <h3>VOTING END IN</h3>
      <div className="tag">
        <p className="value">{timerDays}</p>
        <p className="label">Days</p>
      </div>
      <span>:</span>
      <div className="tag">
        <p className="value">{timerHours}</p>
        <p className="label">Hours</p>
      </div>
      <span>:</span>
      <div className="tag">
        <p className="value">{timerMins}</p>
        <p className="label">Minutes</p>
      </div>
      <span>:</span>
      <div className="tag">
        <p className="value">{timerSecs}</p>
        <p className="label">Seconds</p>
      </div>
    </div>
  );
};

export default Timer;
