import React from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page";

const MainBody = (props) => {

  let elements = [
      {name:"justElem"},
      {name:"FIRST", elements:[{name:"11111"},{name:"2222"},{name:"33333"}]},
      {name:"SECOND", elements:[{name:"INELEM"},{name:"IN", elements:[
              {name:"in:11111"},{name:"in:2222"},{name:"in:33333"}
            ]},{name:"2:2222"},{name:"2:33333"}]},
    ]

  return (
    <div className="body">
      {/*<Routes>*/}
      {/*  <Route*/}
      {/*    exact*/}
      {/*    element={<Page/>}*/}
      {/*    path="/page/:name"*/}
      {/*  />*/}
      {/*</Routes>*/}
      <Page elements={elements}/>
    </div>
  );
};

export default MainBody;