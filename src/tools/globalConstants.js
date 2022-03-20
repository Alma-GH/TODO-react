export const typeSymbolList = "sym"
export const typeNumberList = "num"
export const typeScheduleList = "sch"

export const orderLinks = "order links"
export const unSave = "not saved"


export const linkGH = "https://github.com/Alma-GH"
export const linkTG = "https://t.me/TG_Alma"
export const linkVK = "https://vk.com/id261158159"




export const example = {
  "First": [
    {id: 1, name: "justElem", description: "myDesc"},
    {
      id: 2,
      name: "FIRST",
      type: typeNumberList,
      visibleList: true,
      elements: [{id: 3, name: "11111", description: "d"}, {id: 4, name: "2222"}, {id: 5, name: "33333"}]
    },
    {
      id: 6, name: "SECOND", type: null, visibleList: true, elements: [{id: 7, name: "IN_ELEM"}, {
        id: 8, name: "IN", description: "dod", type: null, visibleList: true,
        elements: [{id: 9, name: "in:11111"}, {id: 10, name: "in:2222"}, {id: 11, name: "in:33333"}]
      },
        {id: 12, name: "2:2222"}, {id: 13, name: "2:33333"}
      ]
    },
    {
      id: 14,
      name: "Schedule",
      description: "MY schedule",
      type: typeScheduleList,
      visibleList: true,
      elements: [
        {id: 15, name: "WakeUp+", description: "10:00"},
        {id: 16, name: "Programming", description: "11:00"},
        {id: 17, name: ""},
        {id: 18, name: "+", description: "15:00"},
      ]
    }
  ],
  "Second": [
    {id: 1, name: "elem ON second"},
    {id: 2, name: "yetELem"}
  ],
  "Third": [""],
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