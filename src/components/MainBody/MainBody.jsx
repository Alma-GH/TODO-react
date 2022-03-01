import React from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page/Page";

const MainBody = (props) => {




  return (
    <div className="body">
      <Routes>
          <Route
            element={<Page mod={props.mod} setAct={props.setAct}/>}
            path="/page/:name/"
          />

      </Routes>
    </div>
  );
};

export default MainBody;