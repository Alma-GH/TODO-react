import React, {useContext} from 'react';
import cls from "./ButtonCreateElement.module.css"
import PageService from "../../../../tools/services/PageService";
import {changeOnPage} from "../../../../tools/utils/func";
import {ThemeContext} from "../../../../context/theme";
import {SettingsContext} from "../../../../context/settings";

const ButtonCreateElement = ({elements,setElements,idList, setIsSave, disable}) => {

  const {lightTheme} = useContext(ThemeContext)
  const {settings} = useContext(SettingsContext)
  let style = [cls.btn2]
  if(lightTheme) style.push(cls.lightBtn2)

  let createElementList = function (){
    PageService.setElements(elements)
    PageService.addElement(idList,settings.autoFilling)

    changeOnPage(setElements,setIsSave)
  }

  return (
    <button tabIndex="-1" className={style.join(" ")} onClick={disable?()=>console.log("not work"):createElementList}>
      <span>+</span>
    </button>
  );
};

export default ButtonCreateElement;