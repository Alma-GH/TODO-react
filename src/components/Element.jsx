import React, {useState} from 'react';
import List from "./List";
import {takeAllElements} from "../func/func.js";

const Element = (props) => {

  let idEl = props.idEl
  let elements = props.elements;


  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let [name, setName] = useState(elements ? props.name + ":" : props.name)

  function changeName(e){
    setName(e.target.value)
    takeAllElements(pageElements, (el)=>{
      if(el.id === idEl){
        el.name = e.target.value
      }
    })
    setPageElements(pageElements)
  }



  return (
    <div className="elem">
      <input type="text"  value={name} onChange={changeName}/>
      {elements ? <List  elements={elements}    pageElements={pageElements} setPageElements={setPageElements} idList={idEl}/> : ""}
    </div>
  );
};

export default Element;