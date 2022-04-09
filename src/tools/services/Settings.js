

class Settings{

  defaultS = {
    autoFolding: true,
    autoFilling: true,
    initialNumberElement: 5,
    symbolForList: "-",
  }

  validFunctionsForSettings = {
    autoFolding: (val)=>val,
    autoFilling: (val)=>val,
    initialNumberElement: (val)=>{
      val = parseInt(val)
      return (!isNaN(val) && 0<=val && val<100) ? val : this.defaultS.initialNumberElement
    },
    symbolForList: (val)=>{
      return (val.length<4) ? val : this.defaultS.symbolForList
    },
  }

  strHintSettings = {
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


}


export default new Settings()