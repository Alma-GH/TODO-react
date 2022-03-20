import {orderLinks} from "../globalConstants";
import {child, get, ref, set} from "firebase/database";

const EMPTY_PAGE = [""]
//TODO:try catch
//TODO: fix save with order
class Server{

 //WARNING: no use
  async getAllFiles(){ //TODO: mb
    try {
      let arr;
      await fetch("https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files.json")
        .then(response=>response.json())
        .then(res=>{
          for(let file in res){
            if(res[file] === null || res[file][0] === "") res[file].length = 0
          }
          arr = res
        })
      return arr
    }catch (e){
      console.log(e.message)
      return []
    }

  }



  async getAllNameFiles(db,user){
    try {
      let arr;
      await get(child(ref(db),`users/${user}/data/files`))
        .then(res=>{
          if(!res.exists()){
            arr = []
            console.log(`NO FILES FOR USER ${user}`)
          }else{
            arr = Object.keys(res.val())
          }
          if(!localStorage.getItem(orderLinks)) localStorage.setItem(orderLinks, JSON.stringify(arr))
        })
      return arr
    }catch (e){
      console.log(e.message)
      return []
    }
  }


  async getElementsByParams(db,user,name){
    let arr;
    await get(child(ref(db),`users/${user}/data/files/${name}`))
      .then(res=>{
        if(!res.exists() || (res.val())[0] === "") arr = []
        else                                       arr = res.val()
      })
      .catch(e=>console.log(e.message))
    return arr
  }



  saveElements(db,user,elements, file){
    if(!elements.length) elements = EMPTY_PAGE
    return set(ref(db,`users/${user}/data/files/${file}`), elements)
  }

  addPage(db,user, name, elements){
    return set(ref(db,`users/${user}/data/files/${name}`), (elements && elements.length)?elements:EMPTY_PAGE)
      .then(()=>{
        let oldSt = JSON.parse(localStorage.getItem(orderLinks))
        let newSt = [...oldSt, name]
        localStorage.setItem(orderLinks, JSON.stringify(newSt))
      })
  }

  deletePage(db,user,name){
    return set(ref(db,`users/${user}/data/files/${name}`), null)
      .then(()=>{
        let oldSt = JSON.parse(localStorage.getItem(orderLinks))
        oldSt.splice(oldSt.indexOf(name),1)
        localStorage.setItem(orderLinks, JSON.stringify(oldSt))
      })
  }

  renamePage(){   //TODO:mb

  }

  async getSettings(db,user){
    let arr;
    await get(child(ref(db),`users/${user}/data/settings`))
      .then(res=>{
        if(res.exists()){
          arr = res.val()
        }else{
          arr = {
            autoFolding: true,
            autoFilling: true,
          }
          console.log(`NO SETTINGS FOR USER ${user}`)
        }

      })
    return arr
  }

  saveSettings(db,user, settings){
    return set(ref(db,`users/${user}/data/settings`), settings)
  }



  async getTheme(db,user){
    let str;
    await get(child(ref(db),`users/${user}/data/LTheme`))
      .then(res=>{
        if(res.exists()){
          str = res.val()
        }else{
          str = false
          console.log(`NO THEME FOR USER ${user}`)
        }
      })
    return str
  }

  saveTheme(db,user, theme){
    return set(ref(db,`users/${user}/data/LTheme`), theme)
  }
}

export default new Server()
