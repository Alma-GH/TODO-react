import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page/Page";
import {ThemeContext} from "../../context/theme";

const MainBody = (props) => {

  const {lightTheme, setLightTheme} = useContext(ThemeContext)

  return (
    <div className={`body ${lightTheme && "lightBody"}`}>

        <Routes>
          <Route
            element={<Page mod={props.mod} setAct={props.setAct} setIsSave={props.setIsSave}/>}
            path="/page/:name/"
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem", color: "blue" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />

        </Routes>

    </div>
  );
};

export default MainBody;