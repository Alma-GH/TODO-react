import React from 'react';
import cls from "./ButtonCreateElement.module.css"
import PageService from "../../../tools/services/PageService";

const ButtonCreateElement = ({elements,setElements,idList}) => {


  let createElementList = function (){
    PageService.setElements(elements)
    PageService.addElement(idList)
    setElements(PageService.pageElements)
  }

  return (
    <button tabIndex="1000" className={cls.button} onClick={createElementList}>
    </button>
  );
};

export default ButtonCreateElement;