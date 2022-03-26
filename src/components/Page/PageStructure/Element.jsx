import React, {useContext, useState} from 'react';
import List from "./List";
import {typeScheduleList} from "../../../tools/globalConstants";
import cls from "./Element.module.css"
import {ThemeContext} from "../../../context/theme";
import ElementAddition from "../../compounds/Element/ElementAddition";
import ElementMain from "../../compounds/Element/ElementMain";


const Element = ({elem:elemProps,pageElements,setPageElements,
                   mod,scheduleEl:isSchedule,setAct,setIsSave
                 }) => {

  let idEl      = elemProps.id
  let elements  = elemProps.elements;
  let type      = elemProps.type
  let vis       = elemProps.visibleList

  const {lightTheme} = useContext(ThemeContext)
  const [elemName, setElemName] = useState(elemProps.name)
  const [elemDesc, setElemDesc] = useState(elemProps.description)


  let [style, setStyle] = useState({opacity:"0"})
  function setStyleForOptions(){
    setStyle({opacity:"100"})
  }
  function removeStyleForOptions(){
    setStyle({opacity:"0"})
  }

  let styleHead = [cls.elemHead]
  if(mod)                                     styleHead.push(cls.elemHeadHover)
  if(type === typeScheduleList)               styleHead.push(cls.elemHeadSchedule)
  if(lightTheme)                              styleHead.push(cls.lightElemHead)

  const visListCondition = !!(elements && elements.length && vis!==false)

  return (
    <div className={cls.elem}>
      <div className={styleHead.join(" ")}
           onMouseOver={setStyleForOptions} onMouseOut={removeStyleForOptions}>
        <ElementMain elements={elements} setPageElements={setPageElements} pageElements={pageElements}
                     setElemDesc={setElemDesc} setElemName={setElemName} type={type} idEl={idEl} style={style}
                     elemName={elemName} mod={mod} setIsSave={setIsSave}/>
        <ElementAddition elemDesc={elemDesc} setElemDesc={setElemDesc}
                         pageElements={pageElements} setPageElements={setPageElements}
                         setIsSave={setIsSave} mod={mod} elemProps={elemProps}  vis={vis} isSchedule={isSchedule}/>
      </div>
      <div>
        {visListCondition &&
          <List idList={idEl} mod={mod} list={{type,elements}}
                  pageElements={pageElements} setPageElements={setPageElements} setAct={setAct} setIsSave={setIsSave} />
        }
      </div>

    </div>
  );
};

export default Element;