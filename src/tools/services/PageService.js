import {myCopyObj, takeAllElements, toTime} from "../func";
import {typeScheduleList} from "../globalConstants";

class PageService{

  name = ""
  pageElements = []

  setElements(elements, name){
    this.pageElements = myCopyObj(elements)
    if(name !== undefined) this.name = name
  }

  getPropsElement(id){
    let obj = {}
    takeAllElements(this.pageElements, el=>{
      if(el.id === id) obj = myCopyObj(el)
    })
    return obj
  }

  addElement(id){

    const newEl = {id: Date.now(), name:""}

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

  addListById(id, type,autoFill){
    takeAllElements(this.pageElements, (el)=>{
      if(el.id === id) {
        el.type = type
        if(!el.elements || !el.elements.length){
          el.visibleList = true
          if(autoFill){
            if(el.name.length) el.name += (el.name[el.name.length-1]!==":") ? ":" : ""
            else               el.name += (type===typeScheduleList)?"Schedule:":"List:"
          }
          el.elements = [{id: Date.now(), name:autoFill?"new":""}]
        }
      }
    })
  }
  deleteListById(id){

  }

  toggleVisibleListById(id, autoFolding){
    takeAllElements(this.pageElements, (el)=>{
      if(el.id === id) {
        el.visibleList = !el.visibleList

        if(autoFolding) takeAllElements(el.elements, el=>{
          if(el.elements && el.elements.length)
            el.visibleList = false
        })


      }
    })
  }
  //Need check
  invisibleListsByDepth(depth){

    takeAllElements(this.pageElements, (el, depthEl)=>{
      if(depthEl === depth && "elements" in el) {
        if(el.visibleList) el.visibleList = false
      }
    })
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

  addDescription(id, autoFill){

    function add(el){
      if(el.id === id){
        el.description = autoFill ? "description" : ""
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
  toggleDescription(id,autoFill){
    takeAllElements(this.pageElements, el=>{
      if(el.id === id){
        if("description" in el){
          this.deleteDescription(id)
        }else{
          this.addDescription(id, autoFill)
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



  //for schedule
  deleteAllSchedule(){
    takeAllElements(this.pageElements, el=>{
      if(el.type === typeScheduleList) el.type = null
    })
  }
  deleteAllInnerList(id){
    takeAllElements(this.pageElements, el=>{
      if(el.id === id){
        if(!("elements" in el)) return
        takeAllElements(el.elements, el=>{
          if("elements" in el) delete el.elements
        })
      }
    })
  }
  toTimeAllDescriptionOfList(id){
    takeAllElements(this.pageElements, el=>{
      if(el.id === id){
        if(!("elements" in el)) return
        takeAllElements(el.elements, (el,depth)=>{
          if(depth!==1) return
          if("description" in el) el.description = toTime(el.description)
        })
      }
    })
  }
}

export default new PageService()
