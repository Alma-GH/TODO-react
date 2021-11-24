import React, {useState} from 'react';
import List from "./List";

const Element = (props) => {

  let idEl = props.idEl
  let elements = props.elements;
  let name = props.name

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  return (
    <div className="elem">
      <input type="text"  value={elements ? name + ":" : name} disabled/>
      {elements ? <List  elements={elements}    pageElements={pageElements} setPageElements={setPageElements} idList={idEl}/> : ""}
    </div>
  );
};

export default Element;