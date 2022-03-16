import React, {useEffect} from 'react';
import cls from "./ButtonMute.module.css"

const ButtonMute = ({sound, setSound}) => {

  let style = [cls.speaker]
  if(!sound) style.push(cls.mute)

  function toggleStyle(){
    setSound(!sound)
  }

  return (
    <div className={style.join(" ")} onClick={toggleStyle}>
      <span></span>
    </div>
  );
};

export default ButtonMute;