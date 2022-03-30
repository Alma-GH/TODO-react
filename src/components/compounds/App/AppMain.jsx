import React from 'react';
import Header from "../../Header/Header";
import Navbar from "../../Navbar/Navbar";
import MainBody from "../../MainBody/MainBody";

const AppMain = ({pages,setPages,   optionMod,setOptionMod,
                   act,setAct,   sidePanel,setSidePanel,
                   sound,setSound, isSave,setSave,
                   isNamesLoading,errNames}) => {



  return (
    <div>
      <Header setPanel={setSidePanel} sidePanel={sidePanel}
              setSound={setSound} sound={sound}
              act={act}
              setPages={setPages} pages={pages}
              setIsSave={[isSave,setSave]}/>

      <Navbar sidePanel={sidePanel}
              links={pages}
              setLinks={setPages}
              setMod={setOptionMod} mod={optionMod}
              isSave={isSave}
              isLoading={[isNamesLoading,errNames]}/>

      <MainBody mod={optionMod} sound={sound} sidePanel={sidePanel}
                setAct={setAct}
                setIsSave={[isSave,setSave]} />
    </div>
  );
};

export default AppMain;