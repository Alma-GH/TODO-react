import React, {useState} from 'react';
import PageService from "../../../tools/services/PageService";
import {changeOnPage, toTime} from "../../../tools/utils/func";
import cls from "./Descriptoin.module.css"
import MyInput from "../../UI/MyInput/MyInput";

const Description = ({elem,mod,setPageElements,isSchedule,setIsSave,elemDesc,setElemDesc}) => {

  let idEl = elem.id

  const [lastVal, setLastVal] = useState(null)

  function saveLast(e){
    setLastVal(e.target.value)
  }


  function setTime(e){
    let val = e.target.value
    //optimization
    if(lastVal===val) return
    if(isSchedule){
      val = toTime(val)
      PageService.setNameDescription(idEl, val)
      changeOnPage(setPageElements,setIsSave)
      setElemDesc(PageService.getPropsElement(idEl).description)
    }
  }

  return (
    <div className={cls.description+" descriptionParent"}>
      <span className="prefixDescription">-</span>
      <MyInput inputProps={{
        type:"text",value: elemDesc,
        onBlur:setTime, onFocus:saveLast, disabled:!mod
      }}
               setValue={setElemDesc}
               setPageElements={setPageElements}
               setIsSave={setIsSave} parentCls={"descriptionParent"} idEl={idEl}
               setter={PageService.setNameDescription.bind(PageService)}
      />
    </div>
  );
};

export default Description;