
const EMPTY_PAGE = [""]

class Server{
  async getAllNameFiles(){
    let arr;
    await fetch("https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files.json")
      .then(response=>response.json())
      .then(res=>{
        arr = Object.keys(res)
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
      .then(res=>console.log(res))
  }

  deletePage(name){
    return fetch(`https://mytodo-4d40f-default-rtdb.europe-west1.firebasedatabase.app/files/${name}.json`,{
      method: "DELETE"
    })
      .then(response=>response.json())
      .then(res=>console.log(res))
  }
}

export default new Server()
