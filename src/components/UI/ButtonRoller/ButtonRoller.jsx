import React, {useContext, useEffect, useState} from 'react';
import cls from "./ButtonRoller.module.css"
import PageService from "../../../tools/services/PageService";
import {changeOnPage, myCopyObj, newSave, toggleClass} from "../../../tools/func";
import {SettingsContext} from "../../../context/settings";

const ButtonRoller = (props) => {

  let pageElements = props.pageElements
  let setElements = props.setElements

  let setIsSave = props.setIsSave

  let id = props.idEl
  let [isStyle, setIsStyle] = useState(null)

  let cond = PageService.getPropsElement(id).visibleList

  const {settings,setSettings} = useContext(SettingsContext)

  function setter(){
    if(PageService.getPropsElement(id).visibleList === false) isStyle = false
    else                                                      isStyle = true
    toggleClass(setIsStyle, isStyle, cls.btnRollerActive)
  }

  useEffect(()=>{
    // setter()
  }, [])

  let toggleVis = function (e){

    PageService.toggleVisibleListById(id, settings.autoFolding)

    changeOnPage(setElements,setIsSave)
    // setElements(PageService.pageElements)
    // newSave(isSave,setSave)
    // setter()
  }

  return (
    <button className={cls.btn} onClick={toggleVis}>
      <div className={cls.btnRoller + " " + ((!cond)?cls.btnRollerActive:null)}></div>
    </button>
  );
};

export default ButtonRoller;