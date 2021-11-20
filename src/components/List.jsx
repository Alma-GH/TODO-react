import React from 'react';
import Element from "./Element";

const List = (props) => {

  let elements = props.elements;

  return (
    <div className="list">
      <ul className="bodyList">
        {elements.map(el=>{
            return <li><Element name = {el.name} elements={el.elements}/></li>
        })}
      </ul>
    </div>
  );
};

export default List;