import React, {useEffect} from 'react';
import clsModal from "../Modal.module.css"
import clsHint from "./Hint.module.css"
import ButtonCreateElement from "../../Buttons/ButtonCreateElement/ButtonCreateElement";
import ElemOptions from "../../ElemOptions/ElemOptions";
import ButtonRoller from "../../Buttons/ButtonRoller/ButtonRoller";
import img from "../../../../img_svg/example-schedule.png"

const Hint = ({hint,setHint,sidePanel,setPanel}) => {

  const hintMax = 9
  let style = [clsModal.modal]
  style.push(clsHint.activeHint)

  let styleH = [clsHint.hintDef]

  useEffect(()=>{
    if(!sidePanel && hint===2) setPanel(true)
  }, [hint])


  function getBodyHint(par){
    switch (par){
      case 1:
        styleH.push(clsHint.hint1)
        return (<div className={styleH.join(" ")}>
          Hover to work with pages
          (save/delete/create/rename)
        </div>)
      case 2:
        styleH.push(clsHint.hint2)
        return (<div className={styleH.join(" ")}>
          -Your pages with lists are stored here
          <br/><br/>
          -Click to move to the page
          <br/>
          -Can be moved by holding the left icon
        </div>)
      case 3:
        styleH.push(clsHint.hint3)
        return <div className={styleH.join(" ")}>Click to edit the page<br/>(add/remove lists)</div>
      case 4:
        styleH.push(clsHint.hint4)
        return (<div className={styleH.join(" ")}>
                  <div className={clsHint.xCenter}>
                    <ButtonCreateElement disable={true}/>
                  </div>
                  <div>
                    - Creates a line on the page
                  </div>
                </div>)
      case 5:
        styleH.push(clsHint.hint5)
        return (<div className={styleH.join(" ")}>
                  <div className={clsHint.xCenter}>
                    <ElemOptions disable={true}/>
                  </div>
                  <div>
                    <ul>Page element control:
                      <li><div>1:</div> Create a numbered list</li>
                      <li><div>S:</div> Create a list with a prefix</li>
                      <li><div>-:</div> Create a normal list</li>
                      <li><div>SCH:</div> Creating a schedule</li>
                      <br/>
                      <li><div>D:</div> Add Description/Time</li>
                      <li><div>X:</div> Delete</li>
                    </ul>
                  </div>
                </div>)
      case 6:
        styleH.push(clsHint.hint6)
        return <div className={styleH.join(" ")}>
          <div>
            For scheduling<br/>
            add description with time to lines
          </div>
          <div>
            <img src={img} alt=""/>
          </div>

        </div>
      case 7:
        styleH.push(clsHint.hint7)
        return (<div className={styleH.join(" ")}>
          <div className={clsHint.xCenter} >
            <div style={{width:"25px"}}>
              <ButtonRoller  disableOn={true}/>
            </div>
            <div style={{width:"25px"}}>
              <ButtonRoller  disableOn={false}/>
            </div>
          </div>
          <div>
            To collapse/expand list items
            <br/> (press - ctrl + k + (num))
          </div>
        </div>)
      case 8:
        styleH.push(clsHint.hint8)
        return (<div className={styleH.join(" ")}>
                  <ul>
                    <li>-Current activity (corresponding to the set schedule)</li>
                    <li>-Switch of the sound notification about the change of activity</li>
                    <li>-Current time</li>
                    <li>-Exit</li>
                  </ul>
                </div>)

      default:
        return <div>ERROR</div>

      // return <div className={styleH.join(" ")}>{child}</div>
    }
  }

  return (
    <div className={style.join(" ")} onClick={()=>setHint((hint+1)%hintMax)}>
        {getBodyHint(hint)}
    </div>
  );
};

export default Hint;