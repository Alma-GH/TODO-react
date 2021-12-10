import React from 'react';
import genCls from "./ButtonOption.module.css"

const ButtonOption = (props) => {


  return (
    <button className={`${genCls.button}`} onClick={props.callback}>
    </button>
  );
};

export default ButtonOption;