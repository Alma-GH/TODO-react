import React, {useContext, useEffect, useState} from 'react';
import cls from "./Timer.module.css"
import ButtonMute from "../UI/ButtonToggleBool/ButtonMute/ButtonMute";
import {ThemeContext} from "../../context/theme";

const Timer = (props) => {

  const {lightTheme, setLightTheme} = useContext(ThemeContext)
  let style = [cls.timer]
  if(lightTheme) style.push(cls.lightTimer)

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
    <div className={style.join(" ")}>
        <div className={cls.actName}>{props.act}</div>
        <div className={cls.center}>
          <ButtonMute sound={props.sound} setSound={props.setSound}/>
        </div>
        <div className={cls.time}>
        {getClock(time)}
      </div>
    </div>
  );
};

export default Timer;