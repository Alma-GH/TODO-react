import React from 'react';
import Element from "./Element";
import ButtonCreateElement from "./UI/ButtonCreateElement/ButtonCreateElement";
import {myCopyObj} from "../tools/func";
import {typeNumberList, typeSymbolList} from "../tools/globalConstants";

const List = (props) => {

  let list = props.list.elements
  let type = props.list.type

  let idList = props.idList

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  function getName(name, prefix1, prefix2){
    if(type === typeNumberList){
      name = prefix1 + name
    }else if(type === typeSymbolList){
      name = prefix2 + name
    }

    return name
  }

  return (
    <div className="list">
      <ul className="bodyList">
        {list.map((el,ind)=>{
            let copyEl = myCopyObj(el)
            copyEl.name = getName(el.name,(ind+1) + ")", "-")
            return <li key={el.id}><Element
              elem={copyEl}
              pageElements={pageElements}
              setPageElements={setPageElements}/>
            </li>
        })}
        <li><ButtonCreateElement elements={pageElements} setElements={setPageElements} idList={idList}/></li>
      </ul>
    </div>
  );
};

export default List;