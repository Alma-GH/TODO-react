import {orderLinks} from "../globalConstants";

const EMPTY_PAGE = [""]
//TODO:try catch
class Server{
  async getAllFiles(){
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
  }

  async getAllNameFiles(){
    let arr;
    await fetch("https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files.json")
      .then(response=>response.json())
      .then(res=>{
        arr = Object.keys(res)
        if(!localStorage.getItem(orderLinks)) localStorage.setItem(orderLinks, JSON.stringify(arr))
      })
    return arr
  }
  async getElementsByParams(name){
    let arr;
    await fetch(`https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files/${name}.json`)
      .then(response=>response.json())
      .then(res=>{
        if(res === null || res[0] === "") arr = []
        else                              arr = res
      })
    return arr
  }

  saveElements(elements, file){
    if(!elements.length) elements = EMPTY_PAGE
    return fetch(`https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files/${file}.json`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(elements),
    })
      .then(response=>response.json())
      .then(res=>console.log(res))
  }

  addPage(name, elements){
    return fetch(`https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files/${name}.json`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify((elements && elements.length)?elements:EMPTY_PAGE),
    })
      .then(response=>response.json())
      .then(res=>{
        console.log(res)
        let oldSt = JSON.parse(localStorage.getItem(orderLinks))
        let newSt = [...oldSt, name]
        localStorage.setItem(orderLinks, JSON.stringify(newSt))
      })
  }

  deletePage(name){
    return fetch(`https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files/${name}.json`,{
      method: "DELETE"
    })
      .then(response=>response.json())
      .then(res=>{
        console.log(res)
        let oldSt = JSON.parse(localStorage.getItem(orderLinks))
        oldSt.splice(oldSt.indexOf(name),1)
        let newSt = oldSt
        localStorage.setItem(orderLinks, JSON.stringify(newSt))
      })
  }

  renamePage(){   //TODO:mb

  }
}

export default new Server()
