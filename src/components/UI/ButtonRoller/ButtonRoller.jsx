import React, {useState} from 'react';
import {myCopyObj, takeAllElements} from "../../../tools/func";
import cls from "./ButtonRoller.module.css"

const ButtonRoller = (props) => {

  let pageElements = props.pageElements
  let setElements = props.setElements

  let id = props.idEl
  let [style, setStyle] = useState(null)

  let toggleVis = function (e){
    if(style === null) setStyle(cls.btnRollerActive)
    else               setStyle(null)

    let newElements = myCopyObj(pageElements)
    takeAllElements(newElements, (el)=>{
      if(el.id === id) {
        el.visibleList = !el.visibleList
        takeAllElements(el.elements, el=>{
          el.visibleList = true
        })
      }
    })
    setElements(newElements)
  }

  return (
    <button className={cls.btnRoller + " " + style} onClick={toggleVis}>
    </button>
  );
};

export default ButtonRoller;