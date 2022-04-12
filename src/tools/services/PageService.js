import {myCopyObj, takeAllElements, toTime} from "../utils/func";
import {MAX_DEPTH, typeScheduleList} from "../globalConstants";

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

  addElement(id, autoFill){
    const newEl = {id: Date.now(), name:""}

    if(id === undefined){
      this.pageElements = [...this.pageElements, newEl]
      return
    }

    function add(el,dp,arr){

      if(el.id === id){
        if(autoFill && dp>1)
          newEl.description = ""
        arr.splice(arr.indexOf(el)+1,0,newEl)
      }


    }
    takeAllElements(this.pageElements, add)
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
    takeAllElements(this.pageElements, (el,depth)=>{
      if(el.id === id) {

        //limit
        if(depth>MAX_DEPTH){
          alert("Превышено максимальное значение глубины")
          return
        }

        el.type = type
        if(!el.elements || !el.elements.length){
          el.visibleList = true
          const firstEl = {id: Date.now(), name:autoFill?"new":""}
          if(autoFill){
            if(el.name.length) el.name += (el.name[el.name.length-1]!==":") ? ":" : ""
            else               el.name += (type===typeScheduleList)?"Schedule:":"List:"
            firstEl.description = "description"
          }

          if(type===typeScheduleList && autoFill){
            const schedule = []
            for(let i=10; i<=23;i++){
              schedule.push({id: Date.now()+i, name:i===10?"Wake up":"", description:`${i}:00`})
            }
            schedule.push({id: Date.now()+24, name:"", description:`00:00`})
            schedule.push({id: Date.now()+25, name:"Sleep", description:`01:00`})
            el.elements = schedule
          }else{
            el.elements = [firstEl]
          }


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
