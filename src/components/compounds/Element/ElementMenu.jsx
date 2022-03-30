import React from 'react';
import ElemOptions from "../../UI/ElemOptions/ElemOptions";
import ButtonCreateElement from "../../UI/Buttons/ButtonCreateElement/ButtonCreateElement";

const ElementMenu = ({style,setElemName,setElemDesc,
                       idEl, type, setPageElements, pageElements, elements,
                       setIsSave}) => {


  const visBtnCrateCondition = !!(elements && elements.length)

  return (
    <div style={{...style,height:"100%", display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <ElemOptions setters={[setElemName,setElemDesc]} id={idEl} type={type} setPageElements={setPageElements} style={style} setIsSave={setIsSave}/>
      {visBtnCrateCondition &&
        <ButtonCreateElement elements={pageElements} setElements={setPageElements} idList={idEl} setIsSave={setIsSave}/>
      }
    </div>
  );
};

export default ElementMenu;
