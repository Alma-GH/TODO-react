import "./style/App.css"
import {Route, Routes} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "./context/settings";
import {ThemeContext} from "./context/theme";
import {privateRoutes, publicRoutes} from "./router/routes";
import {useAuthState} from "react-firebase-hooks/auth";
import {DatabaseContext} from "./context/db";
import AppLoad from "./components/compounds/AppLoad";
import Server from "./tools/services/Server";


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

  const {auth} = useContext(DatabaseContext)
  const [user,loader,err] = useAuthState(auth)

  const [lightTheme, setLightTheme] = useState(null)
  const [settings, setSettings] = useState({
    autoFolding: true,
    autoFilling: true,
  })

  useEffect(()=>{
    async function loadTheme(){
      //theme
      let newTheme = await Server.getTheme()
      setLightTheme(newTheme)
    }
    loadTheme()
      .catch(e=>console.log(e.message))
  })

  let routes = user?privateRoutes:publicRoutes

  if(err) console.log(err)
  if(loader || lightTheme===null) return <div className="App"><AppLoad/></div>

  return (
      <SettingsContext.Provider value={{
        settings,
        setSettings
      }}>
        <ThemeContext.Provider value={{
          lightTheme,
          setLightTheme
        }}>
          <div className="App">
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
          </div>
        </ThemeContext.Provider>
      </SettingsContext.Provider>
  );
}

export default App;

