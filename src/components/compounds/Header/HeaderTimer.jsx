import React from 'react';
import cls from "../../Header/Header.module.css";
import Timer from "../../Timer/Timer";
import ButtonExit from "../../UI/ButtonToggleBool/ButtonExit/ButtonExit";

const HeaderTimer = ({act,sound,setSound}) => {
  return (
    <div className={cls.timerAndExit}>
      <Timer act={act} sound={sound} setSound={setSound}/>
      <div className={cls.exit}>
        <ButtonExit/>
      </div>
    </div>
  );
};

export default HeaderTimer;