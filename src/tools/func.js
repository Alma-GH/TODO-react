

export const takeAllElements = (arr,func)=>{
  arr.map(el=>{
    func(el)
    if('elements' in el)  takeAllElements(el.elements, func)
  })
}

export const myCopyObj = (obj)=>{
  let newObj = JSON.parse(JSON.stringify(obj))
  return newObj
}

// export const returnNew = (arr, funcAdd, funcDel)=>{
//   let newElements = JSON.parse(JSON.stringify(arr))
//
//   if(funcAdd){
//     return newElements.forEach(el=>{
//       funcAdd(el)
//       if('elements' in el) el.elements = returnNew(el.elements, funcAdd)
//     })
//   }
//   if(funcDel){
//     return newElements.filter(el=>{
//       if('elements' in el)  returnNew(el.elements, 0,funcDel)
//       return funcDel(el)
//     })
//   }
// }
