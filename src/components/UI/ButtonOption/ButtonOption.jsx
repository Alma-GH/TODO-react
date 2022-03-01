import React, {useRef, useState} from 'react';
import genCls from "./ButtonOption.module.css"
import {toggleClass} from "../../../tools/func";
import img from "../../../img/settings.png"

const ButtonOption = (props) => {

  let [style, setStyle] = useState(null)
  let changeMod = function (){
    props.setData(!props.data)
    toggleClass(setStyle, style, genCls.buttonActive)
  }
  return (
    <button className={genCls.button + " " + style} onClick={changeMod}>
      <img src={img} alt=""/>
    </button>
  );
};

export default ButtonOption;