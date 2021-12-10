import Navbar from "./components/Navbar";
import "./style/App.css"
import Header from "./components/Header";
import MainBody from "./components/MainBody";
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";

function App(props) {

  let [pages,setPages] = useState([
    {name:"First", body:1},
    {name:"Second"},
    {name:"Third"},
    {name:"Four"}
  ])

  let [optionMod, setOptionMod] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar links={pages} mod={optionMod} setMod={setOptionMod}/>
        <MainBody mod={optionMod}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
