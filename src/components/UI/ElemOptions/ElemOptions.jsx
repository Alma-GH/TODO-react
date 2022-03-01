import React from 'react';
import cls from "./ElemOptions.module.css"
import {typeNumberList, typeSymbolList, typeScheduleList} from "../../../tools/globalConstants";
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
  function createScheduleList(){
    PageService.deleteAllSchedule()
    PageService.toTimeAllDescriptionOfList(id)
    createList(typeScheduleList)
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
      <div className={cls.btnCreateList}>
        <button tabIndex="1000" className={cls.btn} onClick={createNumberedList}>1</button>
        <button tabIndex="1000" className={cls.btn} onClick={createSymbolList}>s</button>
        <button tabIndex="1000" className={cls.btn} onClick={createSimpleList}>-</button>
        <button tabIndex="1000" className={cls.btn + cls.wideBtn} onClick={createScheduleList}>sch</button>
      </div>
      <button tabIndex="1000" className={cls.btn} onClick={toggleDescription}>d</button>
      <button tabIndex="1000" className={cls.btn} onClick={deleteElem}>#</button>
    </div>
  );
};

export default ElemOptions;