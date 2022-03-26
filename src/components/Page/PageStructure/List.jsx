import React, {useContext} from 'react';
import Element from "./Element";
import {typeNumberList, typeScheduleList, typeSymbolList} from "../../../tools/globalConstants";
import cls from "./List.module.css"
import {SettingsContext} from "../../../context/settings";

const List = (props) => {

  const {settings} = useContext(SettingsContext)

  let list = props.list.elements
  let type = props.list.type

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let setIsSave = props.setIsSave

  let mod = props.mod

  function getPrefix(prefix1, prefix2){
    switch (type){
      case typeNumberList:
        return +prefix1.slice(0,prefix1.length-1) % 100 + ")"
      case typeSymbolList:
        return prefix2.slice(0,3)
    }
  }

  return (
    <div className={cls.list}>
      <ul className={cls.bodyList}>
        {list.map((el,ind)=>{
            return <li key={el.id} style={{display: "flex"}}>
              {type && type !== typeScheduleList
                ? <span className={cls.prefixEl}>{getPrefix((ind+1) + ")", settings.symbolForList)}</span>
                : ""
              }
              <Element
              scheduleEl = {type === typeScheduleList}
              elem={el}
              mod={mod}
              pageElements={pageElements}
              setPageElements={setPageElements}
              setAct={props.setAct}
              setIsSave={setIsSave}
              />
            </li>
        })}
      </ul>
    </div>
  );
};

export default List;