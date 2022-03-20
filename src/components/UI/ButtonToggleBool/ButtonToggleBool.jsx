import React from 'react';
import cls from "./ButtonToggleBool.module.css"
import {NF} from "../../../tools/globalConstants";

const ButtonToggleBool = ({setter=NF,now,children,effect=NF}) => {

  function toggle(){
    setter(!now)
    effect()
  }

  return (
    <div onClick={toggle} className={cls.BTB}>
      {children}
    </div>
  );
};

export default ButtonToggleBool;