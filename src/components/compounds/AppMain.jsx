import React from 'react';
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import MainBody from "../MainBody/MainBody";

const AppMain = ({pages,setPages,   optionMod,setOptionMod,
                   act,setAct,   sidePanel,setSidePanel,
                   sound,setSound,   takeArr,setTakeArr,
                   isSave,setSave,   isNamesLoading,errNames}) => {
  return (
    <div>
      <Header setPanel={setSidePanel} sidePanel={sidePanel} sound={sound} setSound={setSound}
              act={act} setPages={setPages} pages={pages} setIsSave={[isSave,setSave]}/>
      <Navbar sidePanel={sidePanel} takeArr={takeArr} links={pages} setLinks={setPages} mod={optionMod}
              setMod={setOptionMod} isSave={isSave} isLoading={[isNamesLoading,errNames]}/>
      <MainBody setTakeArr={setTakeArr} mod={optionMod} setAct={setAct}
                sound={sound} setIsSave={[isSave,setSave]} sidePanel={sidePanel}/>
    </div>
  );
};

export default AppMain;