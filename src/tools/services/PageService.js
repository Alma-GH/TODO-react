import {myCopyObj, takeAllElements} from "../func";

class PageService{

  pageElements = []

  setElements(elements){
    this.pageElements = myCopyObj(elements)
  }


  addElement(id){

    const newEl = {id: Date.now(), name:"new"}

    function add(el){
      if(el.id === id){
        el.elements.push(newEl)
      }
    }

    if(id !== undefined){
      takeAllElements(this.pageElements, add)
    }
    else{
      this.pageElements = [...this.pageElements, newEl]
    }
  }
  deleteElement(id){
    function del(el){
      if("elements" in el) el.elements = el.elements.filter(del)
      return ("id" in el)
    }

    takeAllElements(this.pageElements, (el)=>{
      if(el.id === id) delete el.id
    })
    this.pageElements = this.pageElements.filter(del)
  }


  addListById(id, type){
    takeAllElements(this.pageElements, (el)=>{
      if(el.id === id) {
        el.type = type
        if(!el.elements || !el.elements.length){
          el.visibleList = true
          el.name += (el.name[el.name.length-1]!==":") ? ":" : ""
          el.elements = [{id: Date.now(), name:"new"}]
        }
      }
    })
  }
  deleteListById(id){
  }



  setName(id, name){
    function set(el){
      if(el.id === id){
        el.name = name
      }
    }
    if(id !== undefined){
      takeAllElements(this.pageElements, set)
    }

  }

  addDescription(id){
    let newDes = "newDescription"

    function add(el){
      if(el.id === id){
        el.description = newDes
      }
    }

    if(id !== undefined){
      takeAllElements(this.pageElements, add)
    }
  }
  deleteDescription(id){
    function del(el){
      if(el.id === id){
        delete el.description
      }
    }

    if(id !== undefined){
      takeAllElements(this.pageElements, del)
    }
  }
  toggleDescription(id){
    takeAllElements(this.pageElements, el=>{
      if(el.id === id){
        if("description" in el){
          this.deleteDescription(id)
        }else{
          this.addDescription(id)
        }
      }
    })
  }
  setNameDescription(id, name){
    function set(el){
      if(el.id === id && "description" in el){
        el.description = name
      }
    }
    if(id !== undefined){
      takeAllElements(this.pageElements, set)
    }
  }
}

export default new PageService()
