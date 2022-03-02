import React, {useEffect, useState} from 'react';
import cls from "./ButtonRoller.module.css"
import PageService from "../../../tools/services/PageService";
import {myCopyObj, newSave, toggleClass} from "../../../tools/func";

const ButtonRoller = (props) => {

  let pageElements = props.pageElements
  let setElements = props.setElements

  let [isSave,setSave] = props.setIsSave

  let id = props.idEl
  let [isStyle, setIsStyle] = useState(null)

  let cond = PageService.getPropsElement(id).visibleList

  function setter(){
    if(PageService.getPropsElement(id).visibleList === false) isStyle = false
    else                                                      isStyle = true
    toggleClass(setIsStyle, isStyle, cls.btnRollerActive)
  }

  useEffect(()=>{
    // setter()
  }, [])

  let toggleVis = function (e){
    PageService.toggleVisibleListById(id)
    setElements(PageService.pageElements)

    newSave(isSave,setSave)
    // setter()
  }

  return (
    <button className={cls.btn} onClick={toggleVis}>
      <div className={cls.btnRoller + " " + ((!cond)?cls.btnRollerActive:null)}></div>
    </button>
  );
};

export default ButtonRoller;