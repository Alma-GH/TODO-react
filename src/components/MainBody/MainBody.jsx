import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page";

const MainBody = (props) => {

  let [elements, setElements] = useState([
    {id:1,name:"justElem"},
    {id:2,name:"FIRST", elements:[{id:1,name:"11111"},{id:2,name:"2222"},{id:3,name:"33333"}]},
    {id:3,name:"SECOND", elements:[{id:1,name:"INELEM"},{id:2,name:"IN", elements:[
          {id:1,name:"in:11111"},{id:2,name:"in:2222"},{id:3,name:"in:33333"}
        ]},{id:3,name:"2:2222"},{id:4,name:"2:33333"}]},
  ])

  return (
    <div className="body">
      {/*<Routes>*/}
      {/*  <Route*/}
      {/*    exact*/}
      {/*    element={<Page/>}*/}
      {/*    path="/page/:name"*/}
      {/*  />*/}
      {/*</Routes>*/}
      <Page elements={elements} setElements={setElements}/>
    </div>
  );
};

export default MainBody;