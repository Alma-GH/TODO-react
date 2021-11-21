import React, {useState} from 'react';
import Element from "./Element";
import ButtonCreateElement from "./UI/ButtonCreateElement/ButtonCreateElement";

const List = (props) => {

  // let elements = props.elements;
  let [list,setList] = useState(props.elements)

  return (
    <div className="list">
      <ul className="bodyList">
        {list.map(el=>{
            return <li key={el.id}><Element name = {el.name} elements={el.elements}/></li>
        })}
        {/*<li><ButtonCreateElement/></li>*/}
      </ul>
    </div>
  );
};

export default List;