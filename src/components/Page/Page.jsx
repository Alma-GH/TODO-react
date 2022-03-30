import React, {useContext, useEffect, useState} from 'react';
import {orderLinks, typeScheduleList} from "../../tools/globalConstants";
import Panel from "./PageStructure/Panel";
import PageService from "../../tools/services/PageService";
import {useParams} from "react-router-dom";
import {changeOnPage, compareTimeOfDay, isClock, takeAllElements} from "../../tools/utils/func";
import {keyboardTimer} from "../../tools/utils/wrappers";
import Server from "../../tools/services/Server";
import cls from "./Page.module.css"
import SaveService from "../../tools/services/SaveService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../Loader/Loader";
import srcAudio from "../../sound/nextAct.mp3"
import {ThemeContext} from "../../context/theme";
import {DatabaseContext} from "../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";
import PageBody from "../compounds/Page/PageBody";
import {OnPageContext} from "../../context/onPage";

const Page = ({mod,setAct,sound:isSound,setIsSave}) => {


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

  const {auth,db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  const {lightTheme} = useContext(ThemeContext)
  const {setIsOnPage} = useContext(OnPageContext)


  let save = setIsSave[0]
  let params = useParams()

  const [elements, setElements] = useState([])
  const [isFolding, setIsFolding] = useState(false)

  const [fetchElements, isElLoading, errEl] = useFetching(async ()=>{
    setAct(null)
    let elems
    let pageName = params.name
    if(save !== null && !save[pageName]){
      elems = SaveService.getNotSave(pageName)
    }else{
      elems = await Server.getElementsByParams(db,user.uid, pageName)
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

  //On page state
  useEffect(()=>{
    const on = !!JSON.parse(localStorage.getItem(orderLinks)).includes(params.name);
    setIsOnPage(on)
    return ()=>{setIsOnPage(false)}
  },[params.name])

  //Get elements
  useEffect(()=>{
    fetchElements()
      .catch(e=>console.log(e.message))
    return ()=>console.log("unmount page")
  }, [params.name])

  //Schedule
  //TODO: optimization
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
        // now.setSeconds(0)
        let lastAct = act

        //now<arrDate[0][1]
        if(compareTimeOfDay("<", now,arrDate[0][1])) act = arrDate[arrDate.length-1][0]

        for(let i = 0; i<arrDate.length; i++){
          //now>=arrDate[i][1]
          if(compareTimeOfDay(">=",now,arrDate[i][1])){
            if(i+1 < arrDate.length){                     //arrDate[i] not last
              //now<arrDate[i+1][1]
              if(compareTimeOfDay("<", now, arrDate[i+1][1])) {act = arrDate[i][0]; break}
            }else                                                  {act = arrDate[i][0]; break}
          }
        }


        if(act !== lastAct && lastAct !== undefined){
          console.log(act, lastAct)
          sound()
        }
        setAct(act)
      }, 1000)
    }

    return ()=>clearInterval(timer)
  }, [elements])

  //Roll up lists
  useEffect(()=>{

    function keyDownEvent(e){
      if(e.ctrlKey || e.metaKey){

        let keyN = +e.key
        let isKeyNum = !isNaN(keyN)

        if(e.key === "k" || isKeyNum) e.preventDefault()

        if(e.key === "k"){
          setIsFolding(true)
          keyboardTimer(()=>setIsFolding(false), 5000)
        }
        else if(isFolding){
          if(isKeyNum){
            PageService.invisibleListsByDepth(keyN)
            changeOnPage(setElements,setIsSave)
          }
          setIsFolding(false)
        }        
      }
    }

    document.addEventListener("keydown", keyDownEvent)
    return ()=>document.removeEventListener("keydown",keyDownEvent)
  }, [isFolding, setIsSave])


  PageService.setElements(elements, params.name)
  window.page = [PageService.name, PageService.pageElements]

  return (
    <div>
        {isElLoading
          ?<Loader classBG={cls.loaderBG} classWrap={cls.loader}/>
          :
          <div className={cls.page + ` ${lightTheme && cls.lightPage}`}>
            <div className={cls.wrapPage}>
              <Panel mod={mod} elements={elements} setElements={setElements} setIsSave={setIsSave}/>
              <PageBody mod={mod} elements={elements} setElements={setElements} setIsSave={setIsSave} setAct={setAct}/>
            </div>
          </div>
        }
    </div>
  );
};

export default Page;