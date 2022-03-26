import React, {useContext} from 'react';
import cls from "./ElemOptions.module.css"
import {typeNumberList, typeScheduleList, typeSymbolList} from "../../../tools/globalConstants";
import PageService from "../../../tools/services/PageService";
import {changeOnPage} from "../../../tools/utils/func";
import {SettingsContext} from "../../../context/settings";

const ElemOptions = (props) => {



  const disable = props.disable
  const [setElemName, setElemDesc] = props.setters ? props.setters : []

  let id = props.id
  let setPageElements = props.setPageElements

  let setIsSave = props.setIsSave

  const {settings} = useContext(SettingsContext)


  function createList(type){
    PageService.addListById(id, type, settings.autoFilling)
    changeOnPage(setPageElements,setIsSave)
    setElemName(PageService.getPropsElement(id).name)
  }
  function deleteElem(){
    PageService.deleteElement(id)
    changeOnPage(setPageElements,setIsSave)
  }
  function toggleDescription(){
    PageService.toggleDescription(id, settings.autoFilling)
    changeOnPage(setPageElements,setIsSave)
    setElemDesc(PageService.getPropsElement(id).description)
  }

  function create(e){
    if(disable) return
    let res = e.target.id
    if(!res) res = null
    if(res === typeScheduleList){
      PageService.deleteAllSchedule()
      PageService.toTimeAllDescriptionOfList(id)
    }
    createList(res)
  }

  return (
    <div className={cls.block}>
      <div className={cls.wrap}>
        <div className={cls.test + ` ${disable?cls.active:""}`}>
          <div className={cls.headList}>
            <div className={cls.bgHead}/>
            <div className={cls.textHead}>type</div>
          </div>
          <ul onClick={create}>
            <li><button tabIndex="-1" className={cls.btn}>-</button></li>
            <li><button tabIndex="-1" className={cls.btn} id={typeNumberList}>1</button></li>
            <li><button tabIndex="-1" className={cls.btn} id={typeSymbolList}>s</button></li>
            <li><button tabIndex="-1" className={cls.btn + ` ${cls.wideBtn}`} id={typeScheduleList}>sch</button></li>
          </ul>
        </div>

        <div className={cls.btns}>
          <button tabIndex="-1" className={cls.btn} onClick={disable?()=>console.log("not work"):toggleDescription}>d</button>
          <button tabIndex="-1" className={cls.btn} onClick={disable?()=>console.log("not work"):deleteElem}>x</button>
        </div>
      </div>
    </div>
  );
};

export default ElemOptions;