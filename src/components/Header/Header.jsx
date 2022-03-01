import React, {useState} from 'react';
import Timer from "../Timer/Timer";
import MenuHeader from "./MenuHeader/MenuHeader";
import ElemMenu from "./MenuHeader/ElemMenu/ElemMenu";
import {useLocation, useNavigate} from "react-router-dom";
import Server from "../../tools/services/Server";
import PageService from "../../tools/services/PageService";
import Modal from "../UI/Modal/Modal";
import Form from "../UI/Forms/Form";
import Confirm from "../UI/Forms/Confirm";
import cls from "./Header.module.css"

const Header = (props) => {

  const nav = useNavigate()

  const path = useLocation().pathname
  const fileName = path.slice(path.lastIndexOf("/")+1)
  const pages = props.pages

  let [modal, setModal] = useState(false)
  let [input, setInput] = useState(null)
  let [bodyModal, setBodyModal] = useState("")

  function save(){
    Server.saveElements(PageService.pageElements,PageService.name)
  }

  function create(){
    setBodyModal("create")
    setInput("");
    setModal(true);
  }

  async function deletePage(){
    setBodyModal("delete")
    setModal(true);
  }

  async function rename(){
    setBodyModal("rename")
    setInput(PageService.name);
    setModal(true);
  }

  function open(){
    console.log("open")
  }

  function getModalBody(par){
    async function createPage(){
      if(!input || [0,input.length-1].includes(input.indexOf(" "))) return
      setModal(false)

      await Server.addPage(input)
      let newPages = await Server.getAllNameFiles()
      props.setPages(newPages)

      nav("./page/" + input)

    }

    async function deletePage(){
      setModal(false)
      await Server.deletePage(PageService.name)
      let newPages = await Server.getAllNameFiles()
      props.setPages(newPages)

      //MB ERROR
      let ind = pages.indexOf(fileName)
      let newPageName = pages[(!ind)?1:ind-1]
      nav("./page/" + newPageName)


    }

    async function renamePage(){
      if(!input || [0,input.length-1].includes(input.indexOf(" ")) ) return
      setModal(false)
      await Server.deletePage(fileName)
      await Server.addPage(input, PageService.pageElements)
      let newPages = await Server.getAllNameFiles()
      props.setPages(newPages)

      nav("./page/" + input)
    }

    switch (par){
      case "create":
        return (<Form
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
        return (<Form
          btnFunc={renamePage}
          btnName="Rename"

          inputProps={{
            type: "text",
            value: input,
            onChange: e=>setInput(e.target.value)
          }}
        />)
      default:
        return <div></div>
    }
  }



  return (
    <div className={cls.head}>
      <Timer act={props.act}/>
      <div className={cls.menu}>
        <MenuHeader name="File">
          <ElemMenu func={save}>save</ElemMenu>
          <ElemMenu func={create}>create</ElemMenu>
          <ElemMenu func={deletePage}>delete</ElemMenu>
          <ElemMenu func={rename}>rename</ElemMenu>
        </MenuHeader>
        <MenuHeader name="Options">
          <ElemMenu func={()=>console.log("HI IT IS THEME")}>theme</ElemMenu>
          <ElemMenu func={()=>console.log("HI IT IS ELEMMENU")}>options</ElemMenu>
        </MenuHeader>
        <MenuHeader name="About">
          <ElemMenu func={()=>console.log("HI IT IS ELEMMENU")}>why you need</ElemMenu>
          <ElemMenu func={()=>console.log("HI IT IS ELEMMENU")}>how work</ElemMenu>
          <ElemMenu func={()=>console.log("HI IT IS ELEMMENU")}>about me</ElemMenu>
        </MenuHeader>
      </div>
      <Modal visible={modal} setVisible={setModal}>
        {getModalBody(bodyModal)}
      </Modal>
    </div>
  );
};

export default Header;