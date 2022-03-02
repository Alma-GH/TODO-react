import React from 'react';
import cls from "./ButtonCreateElement.module.css"
import PageService from "../../../tools/services/PageService";
import {newSave} from "../../../tools/func";

const ButtonCreateElement = ({elements,setElements,idList, setIsSave}) => {

  let [isSave, setSave] = setIsSave


  let createElementList = function (){
    PageService.setElements(elements)
    PageService.addElement(idList)
    setElements(PageService.pageElements)
    newSave(isSave,setSave)
  }

  return (
    <button tabIndex="1000" className={cls.button} onClick={createElementList}>
    </button>
  );
};

export default ButtonCreateElement;