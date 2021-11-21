import React from 'react';
import ButtonCreateElement from "./UI/ButtonCreateElement/ButtonCreateElement";
import List from "./List";
import Element from "./Element";
import ButtonOption from "./UI/ButtonOption/ButtonOption";

const Page = (props) => {

  let elements = props.elements;
  let setElements = props.setElements;

  return (
    <div className="page">
      {elements.map(el=>{
        return <Element name={el.name} elements={el.elements} key={el.id}/>
      })}
      <ButtonCreateElement elements={elements} setElements={setElements}/>
    </div>
  );
};

export default Page;