import React, {useContext, useState} from 'react';
import List from "./List";
import ElemOptions from "../../UI/ElemOptions/ElemOptions";
import Description from "./Description";
import PageService from "../../../tools/services/PageService";
import ButtonCreateElement from "../../UI/ButtonCreateElement/ButtonCreateElement";
import {typeScheduleList} from "../../../tools/globalConstants";
import cls from "./Element.module.css"
import {changeOnPage} from "../../../tools/func";
import {ThemeContext} from "../../../context/theme";


const Element = (props) => {

  let elemProps = props.elem
  let idEl = props.elem.id
  let name = props.elem.name

  let elements = props.elem.elements;
  let type = props.elem.type
  let vis = props.elem.visibleList

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let mod = props.mod
  let isSchedule = props.scheduleEl
  let setAct = props.setAct

  let setIsSave = props.setIsSave

  const {lightTheme} = useContext(ThemeContext)

  function changeName(e){
    PageService.setName(idEl, e.target.value)
    changeOnPage(setPageElements,setIsSave)
  }

  let [style, setStyle] = useState({opacity:"0"})
  function setStyleForOptions(e){
    setStyle({opacity:"100"})
  }
  function removeStyleForOptions(){
    setStyle({opacity:"0"})
  }

  let styleHead = [cls.elemHead]
  if(mod)                                     styleHead.push(cls.elemHeadHover)
  if(type === typeScheduleList)               styleHead.push(cls.elemHeadSchedule)
  if(lightTheme)                              styleHead.push(cls.lightElemHead)

  return (
    <div className={cls.elem}>
      <div className={styleHead.join(" ")}
           onMouseOver={setStyleForOptions} onMouseOut={removeStyleForOptions}>
        <div style={{display: "flex", alignItems:"center"}}>
          <input className={cls.elemName}  type="text"  value={name} onChange={changeName} disabled={!mod}/>
          {mod
            ? <div style={{...style, width:"230px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <ElemOptions id={idEl} setPageElements={setPageElements} style={style} setIsSave={setIsSave}/>
                {elements && elements.length
                  ? <ButtonCreateElement elements={pageElements} setElements={setPageElements} idList={idEl} setIsSave={setIsSave}/>
                  : ""
                }
              </div>
            : ""
          }

        </div>
        <div className={cls.descBlock}>
          {vis === false
            ?<div className={cls.threePoint}> <p>•••</p> </div>
            :""
          }
          {("description" in elemProps)
            ?<Description isSchedule={isSchedule} elem={elemProps} pageElements={pageElements}
                          setPageElements={setPageElements} mod={mod} setIsSave={setIsSave}/>
            :""
          }
        </div>

      </div>
      <div>
        {elements && elements.length && vis!==false
          ? <List idList={idEl} mod={mod} list={{type:type,elements:elements}}
                  pageElements={pageElements} setPageElements={setPageElements} setAct={setAct} setIsSave={setIsSave} />
          : ""
        }
      </div>

    </div>
  );
};

export default Element;