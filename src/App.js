import Navbar from "./components/Navbar/Navbar";
import "./style/App.css"
import Header from "./components/Header/Header";
import MainBody from "./components/MainBody/MainBody";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {orderLinks, typeNumberList, typeScheduleList} from "./tools/globalConstants";
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


function App(props) {

  let [pages,setPages] = useState([])

  let [optionMod, setOptionMod] = useState(false)
  let [act, setAct] = useState(null)

  let send = false
  useEffect(async ()=>{

    if(send){
      fetch("https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files.json", {
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "First": [
              {id:1,name:"justElem", description:"myDesc"},
              {id:2,name:"FIRST", type:typeNumberList, visibleList:true, elements:[{id:3,name:"11111",description:"d"},{id:4,name:"2222"},{id:5,name:"33333"}]},
              {id:6,name:"SECOND", type:null, visibleList:true, elements:[{id:7,name:"IN_ELEM"},{id:8,name:"IN",description:"dod", type:null, visibleList:true,
                  elements:[{id:9,name:"in:11111"},{id:10,name:"in:2222"},{id:11,name:"in:33333"}]},
                  {id:12,name:"2:2222"},{id:13,name:"2:33333"}
                ]
              },
              {id:14,name:"Schedule",description: "MYSCHEDULE", type: typeScheduleList, visibleList: true, elements:[
                  {id:15,name:"WakeUp+",description: "10:00"},
                  {id:16,name:"Programming",description: "11:00"},
                  {id:17,name:""},
                  {id:18,name:"+",description: "15:00"},
                ]}
            ],
          "Second":[
              {id:1, name:"elemONsecond"},
              {id:2, name:"yetELem"}
            ],
          "Third":[""],
        })
      })
        .then(response=>response.json())
        .then(res=>console.log("res from BD:",res))
    }

    await Server.getAllNameFiles()
    setPages(JSON.parse(localStorage.getItem(orderLinks)))
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Header act={act} setPages={setPages} pages={pages}/>
        <Navbar links={pages} mod={optionMod} setMod={setOptionMod}/>
        <MainBody mod={optionMod} setAct={setAct}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
