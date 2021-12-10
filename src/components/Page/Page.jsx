import React, {useState} from 'react';
import ButtonCreateElement from "../UI/ButtonCreateElement/ButtonCreateElement";
import Element from "./PageStructure/Element";
import {typeNumberList} from "../../tools/globalConstants";
import Panel from "./PageStructure/Panel";
import PageService from "../../tools/services/PageService";


const Page = (props) => {
  /*structure element
  {
    id:
    name:
    description:

    type:
    visibleList:
    elements:
  }
   */



  let [elements, setElements] = useState([
    {id:1,name:"justElem", description:"myDesc"},
    {id:2,name:"FIRST", type:typeNumberList, visibleList:true, elements:[{id:3,name:"11111",description:"d"},{id:4,name:"2222"},{id:5,name:"33333"}]},
    {id:6,name:"SECOND", type:null, visibleList:true, elements:[{id:7,name:"IN_ELEM"},{id:8,name:"IN",description:"dod", type:null, visibleList:true, elements:[
          {id:9,name:"in:11111"},{id:10,name:"in:2222"},{id:11,name:"in:33333"}
        ]},{id:12,name:"2:2222"},{id:13,name:"2:33333"}]},
  ])

  let mod = props.mod

  window.state = elements
  PageService.setElements(elements)

  return (
    <div className="page">
      <div className="wrapPage">

        <Panel mod={mod} elements={elements} setElements={setElements}/>

        <div className="bodyPage">
          {elements.map(el=>{
            return <Element elem={el} mod={mod} pageElements={elements} setPageElements={setElements} key={el.id}/>
          })}
          {mod
            ? <ButtonCreateElement elements={elements} setElements={setElements}/>
            : ""
          }
        </div>

      </div>
    </div>
  );
};

export default Page;