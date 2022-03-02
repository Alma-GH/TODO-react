import React from 'react';
import Element from "./Element";
import {typeNumberList, typeScheduleList, typeSymbolList} from "../../../tools/globalConstants";
import cls from "./List.module.css"

const List = (props) => {

  let list = props.list.elements
  let type = props.list.type

  let idList = props.idList

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let setIsSave = props.setIsSave

  let mod = props.mod

  function getPrefix(prefix1, prefix2){
    switch (type){
      case typeNumberList:
        return prefix1
      case typeSymbolList:
        return prefix2
    }
  }

  return (
    <div className={cls.list}>
      <ul className={cls.bodyList}>
        {list.map((el,ind)=>{
            return <li key={el.id} style={{display: "flex"}}>
              {type && type !== typeScheduleList
                ? <span className={cls.prefixEl}>{getPrefix((ind+1) + ")", "-")}</span>
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