import React, {useEffect} from 'react';
import clsModal from "../Modal.module.css"
import clsHint from "./Hint.module.css"
import ButtonCreateElement from "../../ButtonCreateElement/ButtonCreateElement";
import ElemOptions from "../../ElemOptions/ElemOptions";
import ButtonRoller from "../../ButtonRoller/ButtonRoller";

const Hint = ({hint,setHint,sidePanel,setPanel}) => {

  const hintMax = 8
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
          Наведите для для работы со страницами
          <br/> (сохранение/удаление/
          <br/> создание/переименование)
        </div>)
      case 2:
        styleH.push(clsHint.hint2)
        return (<div className={styleH.join(" ")}>
          -Здесь храняться ваши страницы со списками.
          <br/><br/> -Нажмите для перемещения на страницу
          <br/><br/> -Можно перемещать, взявшись за левый значек
        </div>)
      case 3:
        styleH.push(clsHint.hint3)
        return <div className={styleH.join(" ")}>Нажмите для редактирования страницы<br/>(добавлениия/удаления списков)</div>
      case 4:
        styleH.push(clsHint.hint4)
        return (<div className={styleH.join(" ")}>
                  <div className={clsHint.xCenter}>
                    <ButtonCreateElement disable={true}/>
                  </div>
                  <div>
                    -Создает строку на странице.
                    <br/><br/> -Для списка создает новый внутренний элемент
                  </div>
                </div>)
      case 5:
        styleH.push(clsHint.hint5)
        return (<div className={styleH.join(" ")}>
                  <div className={clsHint.xCenter}>
                    <ElemOptions disable={true}/>
                  </div>
                  <div>
                    <ul>Управление элементом страницы:
                      <li><div>1:</div> Создание нумерованного списка</li>
                      <li><div>S:</div>  Создание списка с символом вначале</li>
                      <li><div>-:</div>  Создание обычного списка</li>
                      <li><div>SCH:</div>  Создание графика</li>
                      <br/>
                      <li><div>D:</div> Добвление описания/Времени</li>
                      <li><div>X:</div> Удаление</li>
                    </ul>
                  </div>
                </div>)
      case 6:
        styleH.push(clsHint.hint6)
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
            Для сворачивания/разворачивания элементов списка
            <br/> (нажатие/ctrl + k + (num))
          </div>
        </div>)
      case 7:
        styleH.push(clsHint.hint7)
        return (<div className={styleH.join(" ")}>
                  -Время на данный момент
                  <br/><br/>-Текущее занятие
                  <br/> (соответсвующее поставленному графику)
                </div>)

      default:
        return <div>0</div>
    }
  }

  return (
    <div className={style.join(" ")} onClick={()=>setHint((hint+1)%hintMax)}>
        {getBodyHint(hint)}
    </div>
  );
};

export default Hint;