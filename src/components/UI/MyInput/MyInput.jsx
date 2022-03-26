import React, {useEffect, useState} from 'react';
import {changeOnPage} from "../../../tools/utils/func";
import PageService from "../../../tools/services/PageService";

const MyInput = ({inputProps,setter,idEl,setValue,setPageElements,setIsSave,parentCls}) => {



  function change(e){
    e.target.size = e.target.value.length<20 ?20:e.target.value.length
    setValue(e.target.value)
  }
  //optimization
  function globalChange(e){
    e.target.size = e.target.value.length<20 ?20:e.target.value.length
    setter(idEl, e.target.value)
    changeOnPage(setPageElements,setIsSave)
  }

  function nextIndex(e){

    if(!["ArrowUp","ArrowDown","Enter"].includes(e.key)) return

    if(e.key === "Enter"){
      e.target.blur()
      return
    }

    let allInputs = document.body.querySelectorAll(`.${parentCls} input`)
    for(let i=0; i<allInputs.length; i++){
      if(allInputs[i] !== e.target) continue
      if(e.key === "ArrowUp" && i-1>=0){
        allInputs[i-1].focus()
      }
      if(e.key === "ArrowDown" && i+1<allInputs.length){
        allInputs[i+1].focus()
      }
    }
  }


  return (
    <input  {...inputProps} size={20} onChange={change} onKeyDown={nextIndex} onKeyUp={globalChange} />
  );
};

export default MyInput;