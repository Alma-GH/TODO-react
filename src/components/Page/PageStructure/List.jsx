import React from 'react';
import Element from "./Element";
import ButtonCreateElement from "../../UI/ButtonCreateElement/ButtonCreateElement";
import {typeNumberList, typeSymbolList} from "../../../tools/globalConstants";

const List = (props) => {

  let list = props.list.elements
  let type = props.list.type

  let idList = props.idList

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  let mod = props.mod

  function getPrefix(prefix1, prefix2){
    if(type === typeNumberList){
      return prefix1
    }else if(type === typeSymbolList){
      return prefix2
    }
  }

  return (
    <div className="list">
      <ul className="bodyList">
        {list.map((el,ind)=>{
            return <li key={el.id} style={{display: "flex"}}>
              {type
                ? <span className="prefixEl">{getPrefix((ind+1) + ")", "-")}</span>
                : ""
              }
              <Element
              elem={el}
              mod={mod}
              pageElements={pageElements}
              setPageElements={setPageElements}/>
            </li>
        })}
        {mod
          ?<li><ButtonCreateElement elements={pageElements} setElements={setPageElements} idList={idList}/></li>
          :""
        }
      </ul>
    </div>
  );
};

export default List;