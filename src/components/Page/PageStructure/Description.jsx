import React from 'react';
import PageService from "../../../tools/services/PageService";
import {changeOnPage, toTime} from "../../../tools/utils/func";
import cls from "./Descriptoin.module.css"
import MyInput from "../../UI/MyInput/MyInput";

const Description = (props) => {

  let idEl = props.elem.id
  let mod = props.mod

  let setPageElements = props.setPageElements

  let isSchedule = props.isSchedule

  let setIsSave = props.setIsSave

  function setTime(e){
    let val = e.target.value
    if(isSchedule){
      val = toTime(val)
      PageService.setNameDescription(idEl, val)
      changeOnPage(setPageElements,setIsSave)
      props.setElemDesc(PageService.getPropsElement(idEl).description)
    }
  }

  return (
    <div className={cls.description}>
      <span className="prefixDescription">-</span>
      <MyInput inputProps={{
        type:"text",value: props.elemDesc,
        onBlur:setTime, disabled:!mod, autoFocus:true
      }}
               setValue={props.setElemDesc}
               setPageElements={setPageElements}
               setIsSave={setIsSave} parentCls={cls.description} idEl={idEl}
               setter={PageService.setNameDescription.bind(PageService)}
      />
    </div>
  );
};

export default Description;