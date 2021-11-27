import React, {useState} from 'react';
import ButtonCreateElement from "./UI/ButtonCreateElement/ButtonCreateElement";
import Element from "./Element";
import {typeNumberList} from "../tools/globalConstants";


const Page = (props) => {

  let [elements, setElements] = useState([
    {id:1,name:"justElem"},
    {id:2,name:"FIRST", type:typeNumberList, elements:[{id:3,name:"11111"},{id:4,name:"2222"},{id:5,name:"33333"}]},
    {id:6,name:"SECOND", elements:[{id:7,name:"INELEM"},{id:8,name:"IN", elements:[
          {id:9,name:"in:11111"},{id:10,name:"in:2222"},{id:11,name:"in:33333"}
        ]},{id:12,name:"2:2222"},{id:13,name:"2:33333"}]},
  ])
  window.state = elements

  return (
    <div className="page">
      {elements.map(el=>{
        return <Element elem={el} pageElements={elements} setPageElements={setElements} key={el.id}/>
      })}
      <ButtonCreateElement elements={elements} setElements={setElements}/>
    </div>
  );
};

export default Page;