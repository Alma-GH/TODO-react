import React from 'react';
import cls from "./ElemOptions.module.css"
import {typeNumberList, typeSymbolList, typeScheduleList} from "../../../tools/globalConstants";
import PageService from "../../../tools/services/PageService";
import {changeOnPage, myCopyObj, newSave} from "../../../tools/func";

const ElemOptions = (props) => {

  let id = props.id
  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let setIsSave = props.setIsSave

  PageService.setElements(pageElements)

  function createList(type){
    PageService.addListById(id, type)

    changeOnPage(setPageElements,setIsSave)
    // setPageElements(PageService.pageElements)
    // newSave(isSave,setSave)
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
    changeOnPage(setPageElements,setIsSave)
    // setPageElements(PageService.pageElements)
    // newSave(isSave,setSave)
  }
  function toggleDescription(){
    PageService.toggleDescription(id)
    changeOnPage(setPageElements,setIsSave)
    // setPageElements(PageService.pageElements)
    // newSave(isSave,setSave)
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