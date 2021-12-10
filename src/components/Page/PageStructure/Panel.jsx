import React from 'react';
import {deepCheck, takeAllElements, takeAllElementsWithReturn} from "../../../tools/func";
import ButtonRoller from "../../UI/ButtonRoller/ButtonRoller";

const Panel = (props) => {

  let elements = props.elements
  let setElements = props.setElements

  let mod = props.mod

  let count = 0
  let numeration = takeAllElementsWithReturn(elements, el=>{
    count++
    let num = <div className="wrapNum"  key={el.id}>{count}</div>


    if(el.visibleList === false){
      let add = 0;
      takeAllElements(el.elements, el=>add++)
      count += add
    }

    return num
  })
  let rollers = takeAllElementsWithReturn(elements, (el)=>{
    let button = <ButtonRoller  idEl={el.id}  pageElements={elements} setElements={setElements} key={el.id}/>
    let none = <div className="wrapNum"  key={el.id}></div>

    return (el.elements && el.elements.length) ? button : none
  })

  if(mod){
    deepCheck(numeration, arr=>{
      arr.push(<div className="wrapNum"></div>)
    })
    deepCheck(rollers, arr=>{
      arr.push(<div className="wrapNum"></div>)
    })
  }


  return (
    <div className="panel">
      <div className="numeration">{numeration}</div>
      <div className="rollers">{rollers}</div>
    </div>
  );
};

export default Panel;