import React, {useContext} from 'react';
import cls from "./ButtonMute.module.css"
import ButtonToggleBool from "../ButtonToggleBool";
import {ThemeContext} from "../../../../context/theme";

const ButtonMute = ({sound, setSound}) => {

  const {lightTheme, setLightTheme} = useContext(ThemeContext)
  let style = [cls.speaker]
  if(lightTheme) style.push(cls.lightSpeaker)
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