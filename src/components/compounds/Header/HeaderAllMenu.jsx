import React, {useContext} from 'react';
import MenuHeader from "../../Header/MenuHeader/MenuHeader";
import ElemMenu from "../../Header/MenuHeader/ElemMenu/ElemMenu";
import PageService from "../../../tools/services/PageService";
import Server from "../../../tools/services/Server";
import {DatabaseContext} from "../../../context/db";
import {useAuthState} from "react-firebase-hooks/auth";
import {ThemeContext} from "../../../context/theme";
import {aboutMB, createMB, deleteMB, needMB, optionsMB, renameMB} from "../../../tools/globalConstants";

const HeaderAllMenu = ({setModal,setInputName,setBodyModal,
                   setHint,fetchSave}) => {


  const {auth, db} = useContext(DatabaseContext)
  const [user] = useAuthState(auth)

  const {lightTheme, setLightTheme} = useContext(ThemeContext)


  function save() {
    fetchSave()
  }

  function createMenu() {
    setBodyModal(createMB)
    setInputName("");
    setModal(true);
  }

  function deleteMenu() {
    setBodyModal(deleteMB)
    setModal(true);
  }

  function renameMenu() {
    setBodyModal(renameMB)
    setInputName(PageService.name);
    setModal(true);
  }


  function optionsMenu() {
    setBodyModal(optionsMB)
    setModal(true)
  }

  async function nextTheme() {
    let newTheme = !lightTheme
    setLightTheme(null)
    await Server.saveTheme(db, user.uid, newTheme)
    setLightTheme(newTheme)
  }


  function aboutMenu(bodyStr) {
    setBodyModal(bodyStr)
    setModal(true)
  }

  function hintMenu() {
    setHint(1)
  }


  return (
    <>
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
        <ElemMenu func={() => aboutMenu(needMB)}>why you need</ElemMenu>
        <ElemMenu func={() => hintMenu()}>how work</ElemMenu>
        <ElemMenu func={() => aboutMenu(aboutMB)}>about me</ElemMenu>
      </MenuHeader>
    </>
  );
};

export default HeaderAllMenu;