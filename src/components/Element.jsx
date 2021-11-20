import React from 'react';
import List from "./List";

const Element = (props) => {

  let name = props.name;
  let elements = props.elements;


  return (
    <div className="elem">
      <input type="text"  value={name} disabled/>
      {elements ? <List elements={elements}/> : ""}
    </div>
  );
};

export default Element;