import PageService from "./services/PageService";
import {unSave} from "./globalConstants";
import SaveService from "./services/SaveService";


export const takeAllElements = (arr,func, depth)=>{
  if(depth === undefined) depth = 1

  arr.map(el=>{
    func(el, depth)
    if('elements' in el)  takeAllElements(el.elements, func, depth + 1)
  })

}

export const myCopyObj = (obj)=>{
  let newObj = JSON.parse(JSON.stringify(obj))
  return newObj
}

export const takeAllElementsWithReturn = (arr,func, consVis)=>{
  /* res - array of results*/
  let res = [];
  arr.map(el=>{
    res.push(func(el))
    if('elements' in el && (el.visibleList || consVis))  res.push(takeAllElementsWithReturn(el.elements, func, consVis))
  })
  return res
}

export const deepCheck = (arr, func)=>{
  arr.map(el=>{
    if(Array.isArray(el) && el.length){
      func(el)
      deepCheck(el, func)
    }
  })
}

export const toggleClass = (setter, style, className)=>{
  if(!style)  setter(className)
  else        setter(null)
}

export const isClock = (str)=>{
  let res = true;
  if(str.length !== 5 || str[2] !== ":") res = false
  str.split("").forEach((el,ind)=>{
    if(ind!==2 && !isDigit(el)) res = false
  })
  return res
}

export const isTime = (str)=>{
  return (isDigit(str[0]) && isDigit(str[1]) &&
          isDigit(str[str.length-2]) && isDigit(str[str.length-1]) &&
          str[0]<3 && str[str.length-2]<6 && (str[0] != 2 || str[1]<5)
  )
}

export const toTime = (val)=>{
  if(isTime(val)) val = val.slice(0,2) + ":" + val.slice(val.length-2)
  else            val = ""
  return val
}

export const isDigit = (dig)=>{
  if(!dig) return false
  dig = dig.toString()
  return (48<=dig.codePointAt(0) && dig.codePointAt(0)<=57)
}



export const newSave  = (val, setter, bool=false)=>{
  if(bool) SaveService.markOut()
  val[PageService.name] = !!bool
  val = myCopyObj(val)
  setter(val)
}

export const changeOnPage = (setElements, saveArg)=>{
  function validArg(){
    if(saveArg.length < 2) return false
    if(typeof saveArg[0] !== "object" || typeof saveArg[1] !== "function") return false
    return true
  }


  setElements(PageService.pageElements)   //1

  if(validArg()){                         //2
    newSave(...saveArg)
  }

  SaveService.markNotSave()               //3
}


export const waiter = (time)=>new Promise((res,rej)=>setTimeout(()=>res("done"),time))


export const splitCamelCase = (str)=>{
  let arr = []
  for(let i=0; i<str.length; i++){
    arr.push(str[i])
    if(str[i+1] && str[i+1] !== str[i+1].toLowerCase()){
      arr.push(" "+str[i+1].toLowerCase())
      i++
    }
  }
  return arr.join("")
}


