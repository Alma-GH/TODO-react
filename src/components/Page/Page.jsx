import React, {useEffect, useState} from 'react';
import ButtonCreateElement from "../UI/ButtonCreateElement/ButtonCreateElement";
import Element from "./PageStructure/Element";
import {allData, typeNumberList, typeScheduleList} from "../../tools/globalConstants";
import Panel from "./PageStructure/Panel";
import PageService from "../../tools/services/PageService";
import {useParams} from "react-router-dom";
import {changeOnPage, isClock, takeAllElements, waiter} from "../../tools/func";
import Server from "../../tools/services/Server";
import cls from "./Page.module.css"
import SaveService from "../../tools/services/SaveService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../UI/Loader/Loader";


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

  let setIsSave = props.setIsSave
  let params = useParams()

  const [elements, setElements] = useState([])
  const [isFolding, setIsFolding] = useState(false)
  const [fetchElements, isElLoading, errEl] = useFetching(async ()=>{
    setAct(null)
    let save = setIsSave[0]
    let elems
    let pageName = params.name

    if(!save[pageName]){
      elems = SaveService.getNotSave(pageName)
    }else{
      elems = await Server.getElementsByParams(pageName)
    }
    if(Array.isArray(elems)) setElements(elems)
    else                     setElements([])

    // await waiter(2000)
    console.log("page load")
  })



  //Get elements
  useEffect(()=>{
    fetchElements()
    return ()=>console.log("unmount page")
  }, [params.name])

  //Schedule
  useEffect(()=>{
    let timer;
    let count = 0;
    takeAllElements(elements, el=>{

      if(el.type !== typeScheduleList) return
      count++
      let arrDate = []
      el.elements.forEach(el=>{
        let desc = el.description
        if(!desc || !desc.length || !isClock(desc)) return
        let date = new Date()
        date.setHours(+desc.slice(0,2))
        date.setMinutes(+desc.slice(3))
        date.setSeconds(0)
        arrDate.push([el.name,date])
      })
      arrDate.sort((a,b)=>a[1]-b[1])

      timer = setInterval(()=>{
        if(!arrDate.length){
          setAct(null)
          return
        }
        let now = new Date()
        now.setSeconds(0)
        let act
        if(now<arrDate[0][1]) act = arrDate[arrDate.length-1][0]
        for(let i = 0; i<arrDate.length; i++){
          if(now>=arrDate[i][1]){
            if(i+1 < arrDate.length){
              if(now<arrDate[i+1][1]) act = arrDate[i][0]
            }else                     act = arrDate[i][0]
          }
        }
        setAct(act)
      }, 1000)
    })
    if(count===0) setAct(null)
    return ()=>clearInterval(timer)
  }, [elements])

  //TODO:Save file by keyboard

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
  useEffect(()=>{
    document.addEventListener("keydown", keyDownEvent)
    return ()=>document.removeEventListener("keydown",keyDownEvent)
  }, [isFolding])

  let mod = props.mod
  let setAct = props.setAct


  PageService.setElements(elements, params.name)

  return (
    <div>
        {isElLoading
          ?<div className={cls.loaderBG}><div className={cls.loader}><Loader/></div></div>
          :
          <div className={cls.page}>
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