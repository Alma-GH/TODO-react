import React, {useEffect, useState} from 'react';
import cls from "./Timer.module.css"
import ButtonMute from "../UI/ButtonMute/ButtonMute";

const Timer = (props) => {

  let [time, setTime] = useState(new Date())
  useEffect(()=>{
    let timer = setInterval(()=>{
      setTime(new Date())
    }, 1000)
    return ()=>clearInterval(timer)
  },[])

  function timeFormat(number){
    if(number.toString().length === 1){
      return "0" + number
    }else return number
  }

  function getClock(date){
    let del = " : "

    let hours = timeFormat(date.getHours())
    let minutes = timeFormat(date.getMinutes())
    let seconds = timeFormat(date.getSeconds())
    return hours + del + minutes + del + seconds
  }

  return (
    <div className={cls.timer}>
      <div className={cls.act}>
        <div className={cls.actName}>{props.act}</div>
        <div className={cls.center}>
          <ButtonMute sound={props.sound} setSound={props.setSound}/>
        </div>

      </div>

      <div className={cls.time}>
        {getClock(time)}
      </div>
    </div>
  );
};

export default Timer;