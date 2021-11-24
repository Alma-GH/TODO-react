import React from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page";

const MainBody = (props) => {




  return (
    <div className="body">
      <Routes>
        <Route
          exact
          element={<Page/>}
          path="/page/:name"
        />
      </Routes>
    </div>
  );
};

export default MainBody;