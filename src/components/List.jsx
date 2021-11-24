import React, {useState} from 'react';
import Element from "./Element";
import ButtonCreateElement from "./UI/ButtonCreateElement/ButtonCreateElement";

const List = (props) => {

  let list = props.elements

  let idList = props.idList
  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  return (
    <div className="list">
      <ul className="bodyList">
        {list.map(el=>{
            return <li key={el.id}><Element
              name = {el.name}
              elements={el.elements}

              idEl={el.id}
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