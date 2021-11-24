import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page";

const MainBody = (props) => {



  let elements = props.elements
  let setElements = props.setElements

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