import {unSave} from "../globalConstants";
import PageService from "./PageService";

const EMPTY_OBJECT = "{}"

class SaveService{

  init(){
    localStorage.setItem(unSave, EMPTY_OBJECT)
  }

  markNotSave(){
    let notSave = JSON.parse(localStorage.getItem(unSave))
    notSave[PageService.name] = PageService.pageElements
    localStorage.setItem(unSave, JSON.stringify(notSave))
  }

  markOut(){
    let notSave = JSON.parse(localStorage.getItem(unSave))
    delete notSave[PageService.name]
    localStorage.setItem(unSave, JSON.stringify(notSave))
  }

  getNotSave(name){
    let notSaveElems = JSON.parse(localStorage.getItem(unSave))[name]
    return notSaveElems
  }
}


export default new SaveService()