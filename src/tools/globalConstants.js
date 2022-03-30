export const typeSymbolList = "sym"
export const typeNumberList = "num"
export const typeScheduleList = "sch"

export const orderLinks = "order links"
export const unSave = "not saved"


export const linkGH = "https://github.com/Alma-GH"
export const linkTG = "https://t.me/TG_Alma"
export const linkVK = "https://vk.com/id261158159"


export const createMB = "create modal body"
export const renameMB = "rename modal body"
export const deleteMB = "delete modal body"
export const optionsMB = "options modal body"
export const aboutMB = "about me modal body"
export const needMB = "why you need modal body"


export const defaultSettings = {
  autoFolding: true,
  autoFilling: true,
  initialNumberElement: 5,
  symbolForList: "-",
}

export const validFunctionsForSettings = {
  autoFolding: (val)=>val,
  autoFilling: (val)=>val,
  initialNumberElement: (val)=>{
    val = parseInt(val)
    return (!isNaN(val) && 0<=val && val<100) ? val : defaultSettings.initialNumberElement
  },
  symbolForList: (val)=>{
    return (val.length<4) ? val : defaultSettings.symbolForList
  },
}

export const strHintSettings = {
  tooltip:{
    autoFolding: "automatic collapse of lists when the parent is collapsed",
    autoFilling: "automatic completion of fields on creation",
    initialNumberElement: "Number of lines per page when created",
    symbolForList: "insert before element when creating list with symbol",
  },
  limitation:{
    initialNumberElement: "(max 99)",
    symbolForList: "(max 3 symbols)",
  },
}

export const NF = ()=>{}






// export const mainColor = "#1d2630"


// export const darkTheme = "dark theme"
// export const lightTheme = "light theme"
//
// export const themeList = {
//   numTheme: 0,
//   arrTheme: [darkTheme,lightTheme],
//   now(){
//     return this.arrTheme[this.numTheme]
//   },
//   next(){
//     this.numTheme += 1
//     this.numTheme = this.numTheme % this.arrTheme.length
//     return this
//   }
// }