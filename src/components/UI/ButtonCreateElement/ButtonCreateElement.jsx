import React, {useRef} from 'react';
import cls from "./ButtonCreateElement.module.css"

const ButtonCreateElement = ({elements,setElements, list, setList}) => {


  let createElement = function (){
    setElements([...elements, {id: Math.max(...elements.map(el=>el.id))+1, name:"new"}])
  }
  // let createElementList = function (){
  //   setList([...list, {id: Math.max(...elements.map(el=>el.id))+1, name:"new"}])
  //
  //   let newElements = 1
  // }

  return (
    <button className={cls.button} onClick={createElement}>
    </button>
  );
};

export default ButtonCreateElement;