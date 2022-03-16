import React from 'react';
import ButtonToggleBool from "../ButtonToggleBool";
import img from "../../../../img/menu.png";
import cls from "./ButtonHidePanel.module.css"

const ButtonHidePanel = ({panel, setPanel}) => {
  return (
    <ButtonToggleBool setter={setPanel} now={panel}>
      <div className={cls.img}>
        <img src={img} alt="H"/>
      </div>
    </ButtonToggleBool>
  );
};

export default ButtonHidePanel;