import React from 'react';
import cls from "../../Navbar/Navbar.module.css";
import ButtonOption from "../../UI/ButtonToggleBool/ButtonOption/ButtonOption";

const NavbarBtn = ({mod,setMod}) => {
  return (
    <div className={cls.wrapBtnOptions}>
      <div className={cls.btnOptions}>
        <ButtonOption data={mod} setData={setMod}/>
      </div>
    </div>
  );
};

export default NavbarBtn;