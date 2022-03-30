import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {DatabaseContext} from "./context/db";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database"
import {compareTimeOfDay} from "./tools/utils/func";

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




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DatabaseContext.Provider value={{
        auth,
        db,
      }}>
        <App/>
      </DatabaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


