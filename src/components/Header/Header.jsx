import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Server from "../../tools/services/Server";
import PageService from "../../tools/services/PageService";
import Modal from "../UI/Modal/Modal";
import SimpleForm from "../UI/Forms/SimpleForm";
import Confirm from "../UI/Forms/Confirm";
import cls from "./Header.module.css"
import {
  aboutMB,
  createMB,
  deleteMB,
  linkGH,
  linkTG,
  linkVK,
  needMB,
  optionsMB,
  orderLinks,
  renameMB
} from "../../tools/globalConstants";
import {newSave} from "../../tools/utils/func";
import {useFetching} from "../../hooks/useFetching";
import Options from "../UI/Modal/Options/Options";
import {SettingsContext} from "../../context/settings";
import {ThemeContext} from "../../context/theme";
import Hint from "../UI/Modal/Hint/Hint";
import ButtonHidePanel from "../UI/ButtonToggleBool/ButtonHidePanel/ButtonHidePanel";
import {DatabaseContext} from "../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";
import HeaderAllMenu from "../compounds/Header/HeaderAllMenu";
import HeaderTimer from "../compounds/Header/HeaderTimer";
import HeaderNotification from "../compounds/Header/HeaderNotification";

const Header = ({ pages,setPanel,sidePanel,
                  setIsSave:[isSave,setSave],
                  setPages,act,sound,setSound}) => {

  const {auth, db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  const {settings, setSettings} = useContext(SettingsContext)
  const {lightTheme} = useContext(ThemeContext)

  const nav = useNavigate()

  // const path = useLocation().pathname
  // const fileName = path.slice(path.lastIndexOf("/") + 1)

  const [modal, setModal] = useState(false)
  const [inputName, setInputName] = useState(null)
  const [bodyModal, setBodyModal] = useState("")

  const [hint, setHint] = useState(0)


  const messageForInvalidFileName = function (name) {
    if (!name || [name[0], name[name.length - 1]].includes(" ")) return "name must not contain spaces at the end and beginning"
    if (JSON.parse(localStorage.getItem(orderLinks)).includes(name)) return "name must be unique"
    if (name.includes(".") || name.includes("/")) return "name must not contain '.' or '/'"
    return false
  }
  function start_operation() {
    let message = messageForInvalidFileName(inputName)
    if (message) throw new Error(message)

    setModal(false)
    setBodyModal("")
  }
  function end_operation(where) {
    let newPages = JSON.parse(localStorage.getItem(orderLinks))
    setPages(newPages)
    nav("./page/" + where)
    newSave(isSave, setSave, true)
  }


  const [fetchCreate, isCreating, errCreate] = useFetching(async () => {

    let initElems = []
    for (let i = 0; i < settings.initialNumberElement; i++) initElems.push({"id": Date.now() + i, "name": ""})
    start_operation()
    await Server.addPage(db, user.uid, inputName, initElems)
      .catch(e => console.log(e.message))
    end_operation(inputName)
  })
  const [fetchRename, isRenaming, errRename] = useFetching(async () => {
    start_operation()
    await Server.renamePage(db, user.uid, PageService.name, inputName)
      .catch(e => console.log(e.message))
    end_operation(inputName)
  })
  const [fetchDelete, isDeleting, errDelete] = useFetching(async () => {
    setModal(false)
    setBodyModal("")
    await Server.deletePage(db, user.uid, PageService.name)

    let newPages = JSON.parse(localStorage.getItem(orderLinks))
    setPages(newPages)

    let ind = pages.indexOf(PageService.name)
    let newPageName = pages[(!ind) ? 1 : ind - 1]
    nav("./page/" + newPageName)
  })
  const [fetchSave, isSaving, errSave] = useFetching(async () => {
    await Server.saveElements(db, user.uid, PageService.pageElements, PageService.name)
    newSave(isSave, setSave, true)
  })

  //Save on "ctrl + s"
  useEffect(() => {

    function keyDownEventSave(e) {
      if (e.ctrlKey || e.metaKey) {

        if (e.key === "s") {
          e.preventDefault()
          save()
        }
      }
    }

    document.addEventListener("keydown", keyDownEventSave)
    return () => document.removeEventListener("keydown", keyDownEventSave)
  }, [save])



  function createPage() {
    fetchCreate()
  }

  function deletePage() {
    fetchDelete()
  }

  function renamePage() {
    fetchRename()
  }


  function save() {
    fetchSave()
  }


  function getModalBody(par) {
    switch (par) {
      case createMB:
        return (<SimpleForm
          btnFunc={createPage}
          btnName="Create"
          err={errCreate.message}
          inputProps={{
            type: "text",
            value: inputName,
            onChange: e => setInputName(e.target.value),
            autoFocus: true
          }}
        />)
      case deleteMB:
        return (<Confirm btnFuncYES={deletePage} btnFuncNO={() => setModal(false)} question="Are you sure?"/>)
      case renameMB:
        return (<SimpleForm
            btnFunc={renamePage}
            btnName="Rename"
            err={errRename.message}
            inputProps={{
              type: "text",
              value: inputName,
              onChange: e => setInputName(e.target.value),
              autoFocus: true
            }}
          />)
      case optionsMB:
        return (<Options settings={settings} setSettings={setSettings} setModal={setModal}/>)

      case aboutMB:
        return (<div className={cls.aboutMe}>
          <a href={linkGH}>Git hub</a>
          <a href={linkVK}>VK</a>
          <a href={linkTG}>Telegram</a>
        </div>)
      case needMB:
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

        <HeaderAllMenu
          setModal={setModal}
          setInputName={setInputName}
          setBodyModal={setBodyModal}
          setHint={setHint}
          fetchSave={fetchSave}
        />

        <HeaderNotification isSaving={isSaving} isCreating={isCreating}
                            isDeleting={isDeleting} isRenaming={isRenaming}
                            errDelete={errDelete} errCreate={errCreate}
                            errRename={errRename} errSave={errSave}
        />
        <HeaderTimer setSound={setSound} sound={sound} act={act}/>
      </div>


      {hint
        ? <Hint setHint={setHint} hint={hint} sidePanel={sidePanel} setPanel={setPanel}/>
        : <Modal visible={modal} setVisible={setModal} setBodyModal={setBodyModal}>
          {getModalBody(bodyModal)}
          </Modal>
      }

    </div>
  );
};

export default Header;