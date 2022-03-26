import "./style/App.css"
import {Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {privateRoutes, publicRoutes} from "./router/routes";
import {useAuthState} from "react-firebase-hooks/auth";
import {DatabaseContext} from "./context/db";
import AppLoad from "./components/compounds/App/AppLoad";


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


  let routes = (user && user.emailVerified)?privateRoutes:publicRoutes

  if(err) console.log(err)
  if(loader) return <div className="App"><AppLoad/></div>

  return (
          <div className="App">
            <Routes>
              {routes.map(route=>(
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />))
              }
            </Routes>
          </div>
  );
}

export default App;

