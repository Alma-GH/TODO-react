import React, {useContext} from 'react';
import cls from "./ElemOptions.module.css"
import {typeNumberList, typeScheduleList, typeSymbolList} from "../../../tools/globalConstants";
import PageService from "../../../tools/services/PageService";
import {changeOnPage} from "../../../tools/func";
import {SettingsContext} from "../../../context/settings";

const ElemOptions = (props) => {

  const disable = props.disable

  let id = props.id
  let setPageElements = props.setPageElements

  let setIsSave = props.setIsSave

  const {settings, setSettings} = useContext(SettingsContext)


  function createList(type){
    PageService.addListById(id, type, settings.autoFilling)

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
    PageService.toggleDescription(id, settings.autoFilling)
    changeOnPage(setPageElements,setIsSave)
    // setPageElements(PageService.pageElements)
    // newSave(isSave,setSave)
  }

  return (
    <div className={cls.block}>
      <div className={cls.wrap}>
        <div className={cls.btnCreateList}>
            <button tabIndex="1000" className={cls.btn} onClick={disable?()=>console.log("not work"):createNumberedList}>1</button>
            <button tabIndex="1000" className={cls.btn} onClick={disable?()=>console.log("not work"):createSymbolList}>s</button>
            <button tabIndex="1000" className={cls.btn} onClick={disable?()=>console.log("not work"):createSimpleList}>-</button>
            <button tabIndex="1000" className={cls.btn +" "+ cls.wideBtn} onClick={disable?()=>console.log("not work"):createScheduleList}>sch</button>
        </div>
        <div>
          <button tabIndex="1000" className={cls.btn} onClick={disable?()=>console.log("not work"):toggleDescription}>d</button>
          <button tabIndex="1000" className={cls.btn} onClick={disable?()=>console.log("not work"):deleteElem}>x</button>
        </div>
      </div>
    </div>
  );
};

export default ElemOptions;