import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {DatabaseContext} from "./context/db";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, set,ref, onValue, get,child,update } from "firebase/database";
import Server from "./tools/services/Server";
import * as json from "./tools/exampleJSON.json"

const firebaseConfig = {
  apiKey: "AIzaSyA2P5Ubd1CXr6ZEghyCrHHpr6U5rm5sQsI",
  authDomain: "mytodo-4d40f.firebaseapp.com",
  databaseURL: "https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mytodo-4d40f",
  storageBucket: "mytodo-4d40f.appspot.com",
  messagingSenderId: "145597083253",
  appId: "1:145597083253:web:fa5c207422800dfe13923c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getDatabase(app);

const user = "test"
const name = "Second"

async function serv(){
  await Server.getAllNameFiles(db,user)
    .then(files=>console.log(`allNameFiles: ${files}`))
  await Server.getElementsByParams(db,user,name)
    .then(res=>console.log(`elementsByParams: ${JSON.stringify(res)}`))
  await Server.saveElements(db,user,json.default.files.Second,name)
  await Server.addPage(db,user,"newPage")
  await Server.addPage(db,user,"newPageWithElems", json.default.files.Third)

  await Server.deletePage(db,user,"newPage")

  await Server.getSettings(db,user)
    .then(res=>console.log(`settings: ${JSON.stringify(res)}`))
  await Server.saveSettings(db,user,{
    autoFolding: true,
    autoFilling: true,
  })

  await Server.getTheme(db,user)
    .then(res=>console.log(res))
  await Server.saveTheme(db,user,true)


}

// serv()



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DatabaseContext.Provider value={{
        auth,
        db
      }}>
        <App/>
      </DatabaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


