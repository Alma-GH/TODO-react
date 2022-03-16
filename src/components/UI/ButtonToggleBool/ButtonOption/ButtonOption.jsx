import React, {useState} from 'react';
import genCls from "./ButtonOption.module.css"
import {toggleClass} from "../../../../tools/func";
import img from "../../../../img/settings.png"
import ButtonToggleBool from "../ButtonToggleBool";

const ButtonOption = (props) => {

  let [style, setStyle] = useState(null)
  let changeMod = function (){
    toggleClass(setStyle, style, genCls.buttonActive)
  }
  return (
    <ButtonToggleBool setter={props.setData} now={props.data}>
      <button className={genCls.button + " " + style} onClick={changeMod}>
        <img src={img} alt="options"/>
      </button>
    </ButtonToggleBool>

  );
};

export default ButtonOption;