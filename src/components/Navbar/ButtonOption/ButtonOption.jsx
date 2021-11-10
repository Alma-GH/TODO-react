import React from 'react';
import genCls from "./ButtonOption.module.css"

const ButtonOption = (props) => {

  let cls;
  if(props.cls === "left")       cls = genCls.leftButton
  else if(props.cls === "right") cls = genCls.rightButton

  return (
    <div className={`${genCls.button} ${cls}`}>

    </div>
  );
};

export default ButtonOption;