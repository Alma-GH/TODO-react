import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Page from "../Page/Page";
import {ThemeContext} from "../../context/theme";
import MainPage from "../Page/MainPage";

const MainBody = ({sidePanel,mod,setAct,sound,setIsSave}) => {

  const {lightTheme} = useContext(ThemeContext)

  let styleComp = ["body"]
  if(lightTheme) styleComp.push("lightBody")
  if(!sidePanel) styleComp.push("notSidePanel")

  return (
    <div className={styleComp.join(" ")}>

        <Routes>
          <Route
            element={<Page mod={mod} setAct={setAct} sound={sound} setIsSave={setIsSave}/>}
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