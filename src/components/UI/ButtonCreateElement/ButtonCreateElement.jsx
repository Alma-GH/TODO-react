import React from 'react';
import cls from "./ButtonCreateElement.module.css"
import PageService from "../../../tools/services/PageService";
import {changeOnPage, newSave} from "../../../tools/func";

const ButtonCreateElement = ({elements,setElements,idList, setIsSave, disable}) => {



  let createElementList = function (){
    PageService.setElements(elements)
    PageService.addElement(idList)

    changeOnPage(setElements,setIsSave)
    // setElements(PageService.pageElements)
    // newSave(isSave,setSave)
  }

  return (
    <button tabIndex="1000" className={cls.btn2} onClick={disable?()=>console.log("not work"):createElementList}>
      +
    </button>
  );
};

export default ButtonCreateElement;