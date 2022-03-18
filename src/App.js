import "./style/App.css"
import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import {SettingsContext} from "./context/settings";
import {ThemeContext} from "./context/theme";
import {AuthContext} from "./context/auth";
import {privateRoutes, publicRoutes} from "./router/routes";

/*STATE:
{
  pages:{
    pagesNames:["...", ...]
    pagesElements: [[{...},...],...]
  }

  optionMod: bool
  act: "..."

  timer:{time: Date}
  menuHeader:[{isShow: bool},...]

  stylesButtonsOption: [{style: "..."}, ...]
  stylesButtonsRoller: [{style: bool}, ...]
  stylesElements:      [{style: {...}}, ...]
}
 */


function App() {

  let b = null

  const [isAuth, setIsAuth] = useState(b)
  const [lightTheme, setLightTheme] = useState(null)
  const [settings, setSettings] = useState({
    autoFolding: true,
    autoFilling: true,
  })

  let routes = isAuth?privateRoutes:publicRoutes

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <SettingsContext.Provider value={{
        settings,
        setSettings
      }}>
        <ThemeContext.Provider value={{
          lightTheme,
          setLightTheme
        }}>

            <Routes>
              {routes.map(route=>(
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />))
              }
            </Routes>

        </ThemeContext.Provider>
      </SettingsContext.Provider>
    </AuthContext.Provider>


  );
}

export default App;

