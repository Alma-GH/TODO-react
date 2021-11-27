import React from 'react';
import cls from "./ButtonCreateElement.module.css"
import {myCopyObj, takeAllElements} from "../../../tools/func.js";

const ButtonCreateElement = ({elements,setElements,idList}) => {
  // Math.max(...elements.map(el=>el.id))+1
  let createElementList = function (){
    let newElements = myCopyObj(elements)

    function addEl(el){
      if(el.id === idList){
        el.elements.push({id: Date.now(), name:"new"})
      }
    }

    if(idList !== undefined){
      takeAllElements(newElements, addEl)
      setElements(newElements)
    }
    else{
      setElements([...elements, {id: Date.now(), name:"new"}])
    }

  }

  return (
    <button className={cls.button} onClick={createElementList}>
    </button>
  );
};

export default ButtonCreateElement;