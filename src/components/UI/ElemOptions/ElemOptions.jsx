import React from 'react';
import cls from "./ElemOptions.module.css"
import {typeNumberList, typeSymbolList} from "../../../tools/globalConstants";
import PageService from "../../../tools/services/PageService";

const ElemOptions = (props) => {

  let id = props.id
  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  PageService.setElements(pageElements)

  function createList(type){
    PageService.addListById(id, type)
    setPageElements(PageService.pageElements)
  }
  function createNumberedList(){
    createList(typeNumberList)
  }
  function createSymbolList(){
    createList(typeSymbolList)
  }
  function createSimpleList(){
    createList(null)
  }
  function deleteElem(){
    PageService.deleteElement(id)
    setPageElements(PageService.pageElements)
  }
  function toggleDescription(){
    PageService.toggleDescription(id)
    setPageElements(PageService.pageElements)
  }

  return (
    <div className={cls.block}>
      <button className={cls.btn} onClick={createNumberedList}>1</button>
      <button className={cls.btn} onClick={createSymbolList}>s</button>
      <button className={cls.btn} onClick={createSimpleList}>-</button>
      <button className={cls.btn} onClick={toggleDescription}>d</button>
      <button className={cls.btn} onClick={deleteElem}>#</button>
    </div>
  );
};

export default ElemOptions;