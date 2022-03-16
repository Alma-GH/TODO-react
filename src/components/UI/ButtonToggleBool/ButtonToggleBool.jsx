import React from 'react';
import cls from "./ButtonToggleBool.module.css"

const ButtonToggleBool = ({setter,now,children}) => {

  function toggle(){
    setter(!now)
  }

  return (
    <div onClick={toggle} className={cls.BTB}>
      {children}
    </div>
  );
};

export default ButtonToggleBool;