import {orderLinks} from "../globalConstants";
import {child, get, ref, set} from "firebase/database";
import PageService from "./PageService";
import Settings from "./Settings";

const EMPTY_PAGE = [""]

class Server{

  async getAllNameFiles(db,user){
      let arr = [];

      await get(child(ref(db),`users/${user}/data/files`))
        .then(res=>{
          if(!res.exists()){
            arr = []
            console.log(`NO FILES FOR USER ${user}`)
          }else{
            arr = Object.keys(res.val())
          }
          // if(!localStorage.getItem(orderLinks)) localStorage.setItem(orderLinks, JSON.stringify(arr))
        })
        .catch((e)=> console.log(e.message))

    let res = await get(child(ref(db),`users/${user}/data/orderFiles`))
      .catch(e=>console.log(e.message))

    if(res.exists()){
      localStorage.setItem(orderLinks, JSON.stringify(res.val()))
    }else{
      await set(ref(db,`users/${user}/data/orderFiles`),arr)
      localStorage.setItem(orderLinks, JSON.stringify(arr))
    }


    return arr
  }


  async getElementsByParams(db,user,name){
    let arr = [];
    await get(child(ref(db),`users/${user}/data/files/${name}`))
      .then(res=>{
        if(!res.exists() || (res.val())[0] === "") arr = []
        else                                       arr = res.val()
      })
      .catch(e=>console.log(e.message))
    return arr
  }


  saveOrder(db,user){
    return set(ref(db,`users/${user}/data/orderFiles`),JSON.parse(localStorage.getItem(orderLinks)))
  }


  saveElements(db,user,elements, file){
    if(!elements.length) elements = EMPTY_PAGE
    return set(ref(db,`users/${user}/data/files/${file}`), elements)
  }

  async addPage(db,user, name, elements){
    let oldSt = JSON.parse(localStorage.getItem(orderLinks))
    let newSt = [...oldSt, name]

    await set(ref(db,`users/${user}/data/files/${name}`), (elements && elements.length)?elements:EMPTY_PAGE)
    await set(ref(db,`users/${user}/data/orderFiles`),newSt)
    localStorage.setItem(orderLinks, JSON.stringify(newSt))
  }

  async deletePage(db,user,name) {
    let oldSt = JSON.parse(localStorage.getItem(orderLinks))
    oldSt.splice(oldSt.indexOf(name), 1)

    await set(ref(db, `users/${user}/data/files/${name}`), null)
    await set(ref(db,`users/${user}/data/orderFiles`),oldSt)
    localStorage.setItem(orderLinks, JSON.stringify(oldSt))
  }

  async renamePage(db,user,oldName,newName) {
    let posPage = JSON.parse(localStorage.getItem(orderLinks)).indexOf(oldName)

    await this.deletePage(db,user, oldName)
    await this.addPage(db,user, newName, PageService.pageElements)

    let newPages = JSON.parse(localStorage.getItem(orderLinks))
    newPages.splice(posPage,0,newPages.pop())

    await set(ref(db,`users/${user}/data/orderFiles`),newPages)
    localStorage.setItem(orderLinks, JSON.stringify(newPages))
  }

  async getSettings(db,user){
    let arr=[];
    await get(child(ref(db),`users/${user}/data/settings`))
      .then(res=>{
        if(res.exists()){
          arr = res.val()
        }else{
          arr = Settings.defaultS
          console.log(`NO SETTINGS FOR USER ${user}`)
        }

      })
      .catch(e=>console.log(e.message))
    return arr
  }

  saveSettings(db,user, settings){
    return set(ref(db,`users/${user}/data/settings`), settings)
  }



  async getTheme(db,user){
    let str = false;
    await get(child(ref(db),`users/${user}/data/LTheme`))
      .then(res=>{
        if(res.exists()){
          str = res.val()
        }else{
          str = false
          console.log(`NO THEME FOR USER ${user}`)
        }
      })
      .catch(e=>console.log(e.message))
    return str
  }

  saveTheme(db,user, theme){
    return set(ref(db,`users/${user}/data/LTheme`), theme)
  }
}

export default new Server()
