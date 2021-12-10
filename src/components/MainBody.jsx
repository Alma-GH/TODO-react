import React from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "./Page/Page";

const MainBody = (props) => {




  return (
    <div className="body">
      <Routes>
        <Route
          exact
          element={<Page mod={props.mod}/>}
          path="/page/:name"
        />
      </Routes>
    </div>
  );
};

export default MainBody;