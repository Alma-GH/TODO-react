import React, {useContext} from 'react';
import {takeAllElements, takeAllElementsWithReturn} from "../../../tools/utils/func";
import ButtonRoller from "../../UI/ButtonRoller/ButtonRoller";
import cls from "./Panel.module.css"
import {ThemeContext} from "../../../context/theme";

const Panel = ({elements,setElements,setIsSave}) => {

  const {lightTheme} = useContext(ThemeContext)

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
    let button = <ButtonRoller  idEl={el.id}  pageElements={elements} setElements={setElements} key={el.id} setIsSave={setIsSave}/>
    let none = <div className={cls.wrapNum}  key={el.id}/>

    return (el.elements && el.elements.length) ? button : none
  })

  let stylePanel = [cls.panel]
  if(lightTheme) stylePanel.push(cls.lightPanel)
  // if(mod){
  //   deepCheck(numeration, arr=>{
  //     arr.push(<div className="wrapNum"></div>)
  //   })
  //   deepCheck(rollers, arr=>{
  //     arr.push(<div className="wrapNum"></div>)
  //   })
  // }


  return (
    <div className={stylePanel.join(" ")}>
      <div className="numeration">{numeration}</div>
      <div className="rollers">{rollers}</div>
    </div>
  );
};

export default Panel;