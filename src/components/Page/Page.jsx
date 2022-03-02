import React, {useEffect, useState} from 'react';
import ButtonCreateElement from "../UI/ButtonCreateElement/ButtonCreateElement";
import Element from "./PageStructure/Element";
import {typeNumberList, typeScheduleList} from "../../tools/globalConstants";
import Panel from "./PageStructure/Panel";
import PageService from "../../tools/services/PageService";
import {useParams} from "react-router-dom";
import {isClock, takeAllElements} from "../../tools/func";
import Server from "../../tools/services/Server";
import cls from "./Page.module.css"


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

  let [elements, setElements] = useState([])
  let setIsSave = props.setIsSave
  let params = useParams()

  //Get elements
  useEffect(async()=>{
    setAct(null)
    let elems = await Server.getElementsByParams(params.name)
    if(Array.isArray(elems)) setElements(elems)
    else                     setElements([])

    console.log("page load")
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
        console.log(act)
        setAct(act)
      }, 1000)
    })
    if(count===0) setAct(null)
    return ()=>clearInterval(timer)
  }, [elements])

  //TODO:Save file by keyboard
  useEffect(()=>{
    document.addEventListener("keydown", e=>{
      // e.preventDefault()
      console.log(e.key)
    })
  }, [])

  let mod = props.mod
  let setAct = props.setAct

  window.state = elements
  PageService.setElements(elements, params.name)
  window.page = [PageService.name, PageService.pageElements]

  return (
    <div className={cls.page}>
      <div className={cls.wrapPage}>

        <Panel mod={mod} elements={elements} setElements={setElements} setIsSave={setIsSave}/>

        <div className={cls.bodyPage}>
          {elements.map(el=>
            <Element elem={el} mod={mod} pageElements={elements} setPageElements={setElements} setAct={setAct} key={el.id} setIsSave={setIsSave}/>)}
          {mod
            ? <ButtonCreateElement elements={elements} setElements={setElements} setIsSave={setIsSave}/>
            : ""
          }
        </div>

      </div>
    </div>
  );
};

export default Page;