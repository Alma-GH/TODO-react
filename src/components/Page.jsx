import React from 'react';
import ButtonCreateElement from "./UI/ButtonCreateElement/ButtonCreateElement";
import List from "./List";
import Element from "./Element";

const Page = (props) => {

  let elements = props.elements;

  return (
    <div className="page">
      {elements.map(el=>{
        return <Element name={el.name} elements={el.elements}/>
      })}
    </div>
  );
};

export default Page;