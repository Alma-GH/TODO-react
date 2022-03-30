import React from 'react';
import cls from "../../Page/Page.module.css";
import Element from "../../Page/PageStructure/Element";
import ButtonCreateElement from "../../UI/Buttons/ButtonCreateElement/ButtonCreateElement";

const PageBody = ({elements,setElements, mod, setAct, setIsSave}) => {

  const arrElements = elements.map(el=>
    <Element elem={el} mod={mod} pageElements={elements}
             setPageElements={setElements} setAct={setAct}
             key={el.id} setIsSave={setIsSave}/>)


  return (
    <div className={cls.bodyPage}>
      {arrElements}
      {mod &&
      <ButtonCreateElement elements={elements} setElements={setElements}
                           setIsSave={setIsSave}/>
      }
    </div>
  );
};

export default PageBody;