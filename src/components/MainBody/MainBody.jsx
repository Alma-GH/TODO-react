import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page/Page";
import {ThemeContext} from "../../context/theme";
import MainPage from "../Page/MainPage";

const MainBody = (props) => {

  const {lightTheme} = useContext(ThemeContext)
  const sidePanel = props.sidePanel

  return (
    <div className={`body ${lightTheme && "lightBody"} ${!sidePanel && "notSidePanel"}`}>

        <Routes>
          <Route
            element={<Page setTakeArr={props.setTakeArr} mod={props.mod} setAct={props.setAct} sound={props.sound} setIsSave={props.setIsSave}/>}
            path="/page/:name/"
          />
          <Route
            path="*"
            element={<MainPage/>}
          />

        </Routes>

    </div>
  );
};

export default MainBody;