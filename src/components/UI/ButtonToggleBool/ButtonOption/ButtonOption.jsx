import React, {useState} from 'react';
import genCls from "./ButtonOption.module.css"
import imgOff from "../../../../img_svg/pencilOff.svg"
import imgOn from "../../../../img_svg/pencilOn.svg"
import ButtonToggleBool from "../ButtonToggleBool";

const ButtonOption = (props) => {

  return (
      <ButtonToggleBool setter={props.setData} now={props.data}>
        <button className={genCls.button}>
          {!props.data
            ?<img src={imgOff} alt="optionsOff"/>
            :<img src={imgOn} alt="optionsOn"/>
          }
        </button>
      </ButtonToggleBool>
  );
};

export default ButtonOption;