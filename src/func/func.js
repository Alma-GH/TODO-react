

export const takeAllElements = (arr,func)=>{
  arr.map(el=>{
    func(el)
    if('elements' in el)  takeAllElements(el.elements, func)
  })
}