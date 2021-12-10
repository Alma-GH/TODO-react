import React from 'react';
import PageService from "../../../tools/services/PageService";

const Description = (props) => {

  let name = props.elem.description
  let idEl = props.elem.id
  let mod = props.mod

  let pageElements = props.pageElements
  let setPageElements = props.setPageElements

  function change(e){
    PageService.setNameDescription(idEl, e.target.value)
    setPageElements(PageService.pageElements)
  }


  return (
    <div className="description">
      <span className="prefixDescription">-</span>
      <input type="text" value={name} onChange={change} disabled={!mod}/>
    </div>
  );
};

export default Description;