import React from 'react';
import {takeAllElements, takeAllElementsWithReturn} from "../../../tools/func";
import ButtonRoller from "../../UI/ButtonRoller/ButtonRoller";
import cls from "./Panel.module.css"

const Panel = (props) => {

  let elements = props.elements
  let setElements = props.setElements

  let mod = props.mod

  let count = 0
  let numeration = takeAllElementsWithReturn(elements, el=>{
    count++
    let num = <div className={cls.wrapNum}  key={el.id}>{count}</div>


    if(el.visibleList === false){
      let add = 0;
      takeAllElements(el.elements, el=>add++)
      count += add
    }

    return num
  })
  let rollers = takeAllElementsWithReturn(elements, (el)=>{
    let button = <ButtonRoller  idEl={el.id}  pageElements={elements} setElements={setElements} key={el.id}/>
    let none = <div className={cls.wrapNum}  key={el.id}></div>

    return (el.elements && el.elements.length) ? button : none
  })

  // if(mod){
  //   deepCheck(numeration, arr=>{
  //     arr.push(<div className="wrapNum"></div>)
  //   })
  //   deepCheck(rollers, arr=>{
  //     arr.push(<div className="wrapNum"></div>)
  //   })
  // }


  return (
    <div className={cls.panel}>
      <div className="numeration">{numeration}</div>
      <div className="rollers">{rollers}</div>
    </div>
  );
};

export default Panel;