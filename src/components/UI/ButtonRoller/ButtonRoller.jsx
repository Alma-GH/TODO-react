import React, {useEffect, useState} from 'react';
import cls from "./ButtonRoller.module.css"
import PageService from "../../../tools/services/PageService";
import {toggleClass} from "../../../tools/func";

const ButtonRoller = (props) => {

  let pageElements = props.pageElements
  let setElements = props.setElements

  let id = props.idEl
  let [isStyle, setIsStyle] = useState(null)

  function setter(){
    if(PageService.getPropsElement(id).visibleList === false) isStyle = false
    else                                                      isStyle = true
    toggleClass(setIsStyle, isStyle, cls.btnRollerActive)
  }

  useEffect(()=>{
    setter()
  }, [])

  let toggleVis = function (e){
    PageService.toggleVisibleListById(id)
    setElements(PageService.pageElements)
    setter()
  }

  return (
    <button className={cls.btnRoller + " " + isStyle} onClick={toggleVis}>
    </button>
  );
};

export default ButtonRoller;