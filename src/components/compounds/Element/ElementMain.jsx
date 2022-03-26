import React from 'react';
import cls from "../../Page/PageStructure/Element.module.css";
import MyInput from "../../UI/MyInput/MyInput";
import PageService from "../../../tools/services/PageService";
import ElementMenu from "./ElementMenu";

const ElementMain = ({elemName,setElemName, pageElements, setPageElements, elements,
                       idEl, type, style, mod, setIsSave, setElemDesc}) => {
  return (
    <div className={cls.elemMain}>
      <MyInput inputProps={{
        type:"text", value: elemName,
        disabled:!mod, className:cls.elemName
      }}
               setValue={setElemName}
               setPageElements={setPageElements}
               setIsSave={setIsSave} parentCls={cls.elemMain} idEl={idEl}
               setter={PageService.setName.bind(PageService)}
      />
      {mod &&
      <ElementMenu setPageElements={setPageElements} pageElements={pageElements} elements={elements}
                   idEl={idEl} type={type} style={style}
                   setElemDesc={setElemDesc} setElemName={setElemName} setIsSave={setIsSave}  />
      }

    </div>
  );
};

export default ElementMain;