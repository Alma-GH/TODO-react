import React from 'react';
import cls from "./ButtonMute.module.css"
import ButtonToggleBool from "../ButtonToggleBool";

const ButtonMute = ({sound, setSound}) => {

  let style = [cls.speaker]
  if(!sound) style.push(cls.mute)


  return (
    <ButtonToggleBool setter={setSound} now={sound}>
      <div className={style.join(" ")}>
        <span></span>
      </div>
    </ButtonToggleBool>
  );
};

export default ButtonMute;