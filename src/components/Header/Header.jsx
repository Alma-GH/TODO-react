import React, {useContext, useState} from 'react';
import Timer from "../Timer/Timer";
import MenuHeader from "./MenuHeader/MenuHeader";
import ElemMenu from "./MenuHeader/ElemMenu/ElemMenu";
import {useLocation, useNavigate} from "react-router-dom";
import Server from "../../tools/services/Server";
import PageService from "../../tools/services/PageService";
import Modal from "../UI/Modal/Modal";
import SimpleForm from "../UI/Forms/SimpleForm";
import Confirm from "../UI/Forms/Confirm";
import cls from "./Header.module.css"
import {linkGH, linkTG, linkVK, orderLinks} from "../../tools/globalConstants";
import {newSave} from "../../tools/func";
import Loader from "../UI/Loader/Loader";
import {useFetching} from "../../hooks/useFetching";
import Options from "../UI/Forms/Options";
import {SettingsContext} from "../../context/settings";
import {ThemeContext} from "../../context/theme";
import Hint from "../UI/Modal/Hint/Hint";
import ButtonHidePanel from "../UI/ButtonToggleBool/ButtonHidePanel/ButtonHidePanel";
import ButtonExit from "../UI/ButtonToggleBool/ButtonExit/ButtonExit";

const Header = (props) => {

  const nav = useNavigate()

  const path = useLocation().pathname
  const fileName = path.slice(path.lastIndexOf("/")+1)
  const pages = props.pages

  const setPanel = props.setPanel
  const sidePanel = props.sidePanel

  const [modal, setModal] = useState(false)
  const [input, setInput] = useState(null)
  const [bodyModal, setBodyModal] = useState("")

  const [isSave,setSave] = props.setIsSave
  const [hint, setHint] = useState(0)

  const [fetchCreate, isCreating, errCreate] = useFetching(async ()=>{
    //TODO: message about non valid name
    if(!validFileName(input)) return
    setModal(false)

    await Server.addPage(input)
    // await waiter(2000)
    let newPages = JSON.parse(localStorage.getItem(orderLinks))
    props.setPages(newPages)


    nav("./page/" + input)
    newSave(isSave,setSave,true)

  })
  const [fetchRename, isRenaming, errRename] = useFetching(async ()=>{
    if(!validFileName(input)) return

    setModal(false)
    let posPage = JSON.parse(localStorage.getItem(orderLinks)).indexOf(PageService.name)
    await Server.deletePage(fileName)
    await Server.addPage(input, PageService.pageElements)
    // await waiter(2000)
    let newPages = JSON.parse(localStorage.getItem(orderLinks))
    newPages.splice(posPage,0,newPages.pop())
    localStorage.setItem(orderLinks, JSON.stringify(newPages))

    props.setPages(newPages)

    nav("./page/" + input)
    newSave(isSave,setSave,true)
  })
  const [fetchDelete, isDeleting, errDelete] = useFetching(async ()=>{
    setModal(false)
    await Server.deletePage(PageService.name)
    // await waiter(2000)
    let newPages = JSON.parse(localStorage.getItem(orderLinks))
    props.setPages(newPages)

    //MB ERROR
    let ind = pages.indexOf(PageService.name)
    let newPageName = pages[(!ind)?1:ind-1]
    nav("./page/" + newPageName)
  })
  const [fetchSave, isSaving, errSave]       = useFetching(async ()=>{
    await Server.saveElements(PageService.pageElements,PageService.name)

    // await waiter(2000)
    newSave(isSave,setSave,true)
  })

  const {settings, setSettings} = useContext(SettingsContext)
  const {lightTheme, setLightTheme} = useContext(ThemeContext)

  const validFileName = function(name){
    if(!name || [0,name.length-1].includes(name.indexOf(" ")))   return false
    if(JSON.parse(localStorage.getItem(orderLinks)).includes(name))    return false
    if(name.includes(".") || name.includes("/"))            return false
    return true
  }

  function createPage(){
    fetchCreate()
  }

  function deletePage(){
    fetchDelete()
  }

  function renamePage(){
    fetchRename()
  }



  function save(){
    fetchSave()
  }

  function createMenu(){
    setBodyModal("create")
    setInput("");
    setModal(true);
  }

  function deleteMenu(){
    setBodyModal("delete")
    setModal(true);
  }

  function renameMenu(){
    setBodyModal("rename")
    setInput(PageService.name);
    setModal(true);
  }



  function optionsMenu(){
    setBodyModal("options")
    setModal(true)
  }

  async function nextTheme(){
    let newTheme = !lightTheme
    setLightTheme(null)
    await Server.saveTheme(newTheme)
    setLightTheme(newTheme)
  }




  function aboutMenu(bodyStr){
    setBodyModal(bodyStr)
    setModal(true)
  }

  function hintMenu(){
    setHint(1)
  }


  function getModalBody(par){
    switch (par){
      case "create":
        return (<SimpleForm
          btnFunc={createPage}
          btnName="Create"

          inputProps={{
            type: "text",
            value: input,
            onChange: e=>setInput(e.target.value)
          }}
        />)
      case "delete":
        return (<Confirm btnFuncYES={deletePage} btnFuncNO={()=>setModal(false)} question="Are you sure?"/>)
      case "rename":
        return (<SimpleForm
          btnFunc={renamePage}
          btnName="Rename"

          inputProps={{
            type: "text",
            value: input,
            onChange: e=>setInput(e.target.value)
          }}
        />)
      case "options":
        return (<Options settings={settings} setSettings={setSettings}/>)

      case "about me":
        return (<div className={cls.aboutMe}>
                  <a href={linkGH}>Git hub</a>
                  <a href={linkVK}>VK</a>
                  <a href={linkTG}>Telegram</a>
                </div>)
      case "why you need":
        return (<div>
                  YOU NEED IT!!
                </div>)



      default:
        return <div>NONE</div>
    }
  }



  return (
    <div className={cls.head + ` ${lightTheme && cls.lightHead}`}>
      <div className={cls.menu}>

        <div className={cls.btnHidePanel}>
          <ButtonHidePanel panel={sidePanel} setPanel={setPanel}/>
        </div>

        <MenuHeader name="File">
          <ElemMenu func={save}>save</ElemMenu>
          <ElemMenu func={createMenu}>create</ElemMenu>
          <ElemMenu func={deleteMenu}>delete</ElemMenu>
          <ElemMenu func={renameMenu}>rename</ElemMenu>
        </MenuHeader>
        <MenuHeader name="Options">
          <ElemMenu func={nextTheme}>theme</ElemMenu>
          <ElemMenu func={optionsMenu}>options</ElemMenu>
        </MenuHeader>
        <MenuHeader name="About">
          <ElemMenu func={()=>aboutMenu("why you need")}>why you need</ElemMenu>
          <ElemMenu func={()=>hintMenu()}>how work</ElemMenu>
          <ElemMenu func={()=>aboutMenu("about me")}>about me</ElemMenu>
        </MenuHeader>

        {(isCreating || isRenaming || isDeleting || isSaving) &&
          <div className={cls.loader}><Loader/></div>
        }
        {(errRename || errSave || errDelete || errCreate) &&
          <div style={{color:"red"}}>HAVE PROBLEM</div>
        }
        <div className={cls.timerAndExit}>
          <Timer act={props.act} sound={props.sound} setSound={props.setSound}/>
          <div className={cls.exit}>
            <ButtonExit/>
          </div>
        </div>

      </div>


      {hint
        ?<Hint setHint={setHint} hint={hint} sidePanel={sidePanel} setPanel={setPanel}/>
        :<Modal visible={modal} setVisible={setModal}>
          {getModalBody(bodyModal)}
        </Modal>
      }

    </div>
  );
};

export default Header;