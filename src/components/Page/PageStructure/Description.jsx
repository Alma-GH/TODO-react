import React from 'react';
import PageService from "../../../tools/services/PageService";
import {changeOnPage, isDigit, isTime, newSave, toTime} from "../../../tools/func";
import cls from "./Descriptoin.module.css"

const Description = (props) => {

  let name = props.elem.description
  let idEl = props.elem.id
  let mod = props.mod

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let isSchedule = props.isSchedule

  let setIsSave = props.setIsSave

  function change(e){
    let TA = e.target
    let newVal = TA.value

    PageService.setNameDescription(idEl, newVal)

    changeOnPage(setPageElements,setIsSave)
    // setPageElements(PageService.pageElements)
    // newSave(isSave,setSave)
  }

  function setTime(e){
    let val = e.target.value
    if(isSchedule){
      val = toTime(val)
      PageService.setNameDescription(idEl, val)
      setPageElements(PageService.pageElements)
    }
  }



  return (
    <div className={cls.description}>
      <span className="prefixDescription">-</span>
      <input  type="text" value={name} onChange={change} onBlur={setTime} disabled={!mod}/>
    </div>
  );
};

export default Description;