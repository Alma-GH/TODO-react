import Navbar from "./components/Navbar/Navbar";
import "./style/App.css"
import Header from "./components/Header/Header";
import MainBody from "./components/MainBody/MainBody";
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";

function App(props) {

  let [elements, setElements] = useState([
    {id:1,name:"justElem"},
    {id:2,name:"FIRST", elements:[{id:3,name:"11111"},{id:4,name:"2222"},{id:5,name:"33333"}]},
    {id:6,name:"SECOND", elements:[{id:7,name:"INELEM"},{id:8,name:"IN", elements:[
          {id:9,name:"in:11111"},{id:10,name:"in:2222"},{id:11,name:"in:33333"}
        ]},{id:12,name:"2:2222"},{id:13,name:"2:33333"}]},
    {id:14, name:"nullLIST", elements: []}
  ])

  let [pages,setPages] = useState([
    {name:"First", body:1},
    {name:"Second"},
    {name:"Third"},
    {name:"Four"}
  ])

  window.state = elements
  return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Navbar links={pages}/>
          <MainBody elements = {elements} setElements = {setElements}/>
        </BrowserRouter>
      </div>
  );
}

export default App;
