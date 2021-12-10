import React from 'react';
import List from "./List";
import ElemOptions from "../../UI/ElemOptions/ElemOptions";
import Description from "./Description";
import PageService from "../../../tools/services/PageService";

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


  function changeName(e){
    PageService.setName(idEl, e.target.value)
    setPageElements(PageService.pageElements)
  }

  return (
    <div className="elem">
      <div className="elemHead">
        <input type="text"  value={name} onChange={changeName} disabled={!mod}/>
        {mod
          ? <ElemOptions id={idEl}  pageElements={pageElements} setPageElements={setPageElements}/>
          : ""
        }
        {("description" in elemProps)
          ?<Description elem={elemProps} pageElements={pageElements} setPageElements={setPageElements} mod={mod}/>
          :""
        }

      </div>
      {elements && elements.length && vis!==false
        ? <List idList={idEl} mod={mod} list={{type:type,elements:elements}} pageElements={pageElements} setPageElements={setPageElements} />
        : ""
      }
    </div>
  );
};

export default Element;