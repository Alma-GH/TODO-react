import Navbar from "./components/Navbar/Navbar";
import "./style/App.css"
import Header from "./components/Header/Header";
import MainBody from "./components/MainBody/MainBody";
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";

function App(props) {

  let [pages,setPages] = useState([
    {name:"First", body:1},
    {name:"Second"},
    {name:"Third"},
    {name:"Four"}
  ])

  return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Navbar links={pages}/>
          <MainBody />
        </BrowserRouter>
      </div>
  );
}

export default App;
