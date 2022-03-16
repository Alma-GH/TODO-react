import React, {useContext, useEffect, useState} from 'react';
import ButtonCreateElement from "../UI/ButtonCreateElement/ButtonCreateElement";
import Element from "./PageStructure/Element";
import {typeScheduleList} from "../../tools/globalConstants";
import Panel from "./PageStructure/Panel";
import PageService from "../../tools/services/PageService";
import {useParams} from "react-router-dom";
import {changeOnPage, isClock, takeAllElements} from "../../tools/func";
import Server from "../../tools/services/Server";
import cls from "./Page.module.css"
import SaveService from "../../tools/services/SaveService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../UI/Loader/Loader";
import srcAudio from  "../../sound/nextAct.mp3"
import {ThemeContext} from "../../context/theme";


const Page = (props) => {
  /*structure element
  {
    id:
    name:
    description:

    type:
    visibleList:
    elements:
  }
   */
  let mod = props.mod
  let setAct = props.setAct

  let isSound = props.sound
  let setIsSave = props.setIsSave
  let save = setIsSave[0]
  let params = useParams()

  const [elements, setElements] = useState([])
  const [isFolding, setIsFolding] = useState(false)
  const {lightTheme,setLightTheme} = useContext(ThemeContext)
  const [fetchElements, isElLoading, errEl] = useFetching(async ()=>{
    setAct(null)
    let elems
    let pageName = params.name
    if(save !== null && !save[pageName]){
      elems = SaveService.getNotSave(pageName)
    }else{
      elems = await Server.getElementsByParams(pageName)
    }
    if(Array.isArray(elems)) setElements(elems)
    else                     setElements([])

    // await waiter(2000)
    console.log("page load")
  })


  function sound() {
    if(!isSound) return
    let audio = new Audio();
    audio.src = srcAudio;
    audio.autoplay = true;
  }

  //Get elements
  useEffect(()=>{
    fetchElements()
    return ()=>console.log("unmount page")
  }, [params.name])

  //Schedule
  //TODO: fix bag
  useEffect(()=>{
    let timer;
    let schElements = []
    takeAllElements(elements, el=>{
      if(el.type !== typeScheduleList) return
      schElements = el.elements
    })

    if(!schElements.length) setAct(null)
    else{
      let arrDate = []
      schElements.forEach(el=>{
        let desc = el.description
        if(!desc || !desc.length || !isClock(desc)) return
        let date = new Date()
        date.setHours(+desc.slice(0,2))
        date.setMinutes(+desc.slice(3))
        date.setSeconds(0)
        arrDate.push([el.name,date])
      })
      arrDate.sort((a,b)=>a[1]-b[1])

      let act
      timer = setInterval(()=>{
        if(!arrDate.length){
          setAct(null)
          return
        }
        let now = new Date()
        now.setSeconds(0)
        let lastAct = act
        if(now<arrDate[0][1]) act = arrDate[arrDate.length-1][0]
        for(let i = 0; i<arrDate.length; i++){
          if(now>=arrDate[i][1]){
            if(i+1 < arrDate.length){                     //arrDate[i] not last
              if(now<arrDate[i+1][1]) act = arrDate[i][0]
            }else                     act = arrDate[i][0]
          }
        }
        if(act !== lastAct && lastAct !== undefined){
          console.log(act, lastAct)
          sound()
        }
        setAct(act)
      }, 1000)
    }

    return ()=>{clearInterval(timer); console.log("timer delete")}
  }, [elements])

  //TODO:Save file by keyboard
  useEffect(()=>{

    // let timeID
    function keyDownEvent(e){
      if(e.ctrlKey || e.metaKey){
        e.preventDefault()
        // if(timeID) clearTimeout(timeID)
        if(e.key === "k"){
          setIsFolding(true)
          // timeID = setTimeout(()=>setIsFolding(false), 3000)
        }else if(isFolding){
          let res = +e.key
          if(!isNaN(res)){
            PageService.invisibleListsByDepth(res)
            changeOnPage(setElements,setIsSave)
          }
          setIsFolding(false)
        }
      }
    }

    document.addEventListener("keydown", keyDownEvent)
    return ()=>document.removeEventListener("keydown",keyDownEvent)
  }, [isFolding])






  PageService.setElements(elements, params.name)
  window.page = [PageService.name, PageService.pageElements]

  return (
    <div>
        {isElLoading
          ?<div className={cls.loaderBG}><div className={cls.loader}><Loader/></div></div>
          :
          <div className={cls.page + ` ${lightTheme && cls.lightPage}`}>
            <div className={cls.wrapPage}>
              <Panel mod={mod} elements={elements} setElements={setElements} setIsSave={setIsSave}/>

              <div className={cls.bodyPage}>
                {elements.map(el=>
                  <Element elem={el} mod={mod} pageElements={elements}
                           setPageElements={setElements} setAct={setAct}
                           key={el.id} setIsSave={setIsSave}/>)
                }
                {mod &&
                <ButtonCreateElement elements={elements} setElements={setElements} setIsSave={setIsSave}/>
                }
              </div>

            </div>
          </div>
        }
    </div>
  );
};

export default Page;