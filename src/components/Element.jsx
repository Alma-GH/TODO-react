import React, {useEffect, useState} from 'react';
import List from "./List";
import {myCopyObj, takeAllElements} from "../tools/func.js";
import ElemOptions from "./UI/ElemOptions/ElemOptions";
import {typeNumberList, typeSymbolList} from "../tools/globalConstants";

const Element = (props) => {

  let idEl = props.elem.id
  let name = props.elem.name

  let elements = props.elem.elements;
  let type = props.elem.type

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements


  function changeName(e){
    let newElements = myCopyObj(pageElements)

    takeAllElements(newElements, (el)=>{
      if(el.id === idEl){
          el.name = e.target.value
      }


    })
    setPageElements(newElements)
  }



  return (
    <div className="elem">
      <input type="text"  value={name} onChange={changeName}/>
      {elements && elements.length
        ? <List idList={idEl} list={{type:type,elements:elements}} pageElements={pageElements} setPageElements={setPageElements} />
        : <ElemOptions id={idEl}  pageElements={pageElements} setPageElements={setPageElements}/>
      }
    </div>
  );
};

export default Element;