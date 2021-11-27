import React from 'react';
import cls from "./ElemOptions.module.css"
import {myCopyObj, takeAllElements} from "../../../tools/func";
import {typeNumberList, typeSymbolList} from "../../../tools/globalConstants";

const ElemOptions = (props) => {

  let id = props.id
  let pageElements = props.pageElements
  let setPageElements = props.setPageElements


  function createList(type){
    let newElements = myCopyObj(pageElements)

    takeAllElements(newElements, (el)=>{
      if(el.id === id) {
        el.type = type
        el.name += (el.name[el.name.length-1]!==":") ? ":" : ""
        el.elements = [{id: Date.now(), name:"new"}]
      }
    })
    setPageElements(newElements)
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

    function delById(el){
        if("elements" in el) el.elements = el.elements.filter(delById)
        return ("id" in el)
    }

    takeAllElements(pageElements, (el)=>{
      if(el.id === id) delete el.id
    })
    let newPageElements = pageElements.filter(delById)
    setPageElements(newPageElements)
  }



  return (
    <div className={cls.block}>
      <button className={cls.btn} onClick={createNumberedList}>1</button>
      <button className={cls.btn} onClick={createSymbolList}>s</button>
      <button className={cls.btn} onClick={createSimpleList}>-</button>
      <button className={cls.btn} onClick={deleteElem}>#</button>
    </div>
  );
};

export default ElemOptions;