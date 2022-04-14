import React, {useContext} from 'react';
import cls from "./Navbar.module.css"
import {ThemeContext} from "../../context/theme";
import NavbarItem from "../compounds/Navbar/NavbarItem";
import NavbarBody from "../compounds/Navbar/NavbarBody";
import NavbarBtn from "../compounds/Navbar/NavbarBTN";

const Navbar = ({mod,setMod,sidePanel,isSave,isLoading:[isLoading,err], links, setLinks}) => {


  const {lightTheme} = useContext(ThemeContext)

  let style = [cls.nav]
  if(!sidePanel) style.push(cls.notSidePanel)
  if(lightTheme) style.push(cls.lightNav)


  let arrLinks = links.map(link=>
    <NavbarItem key={link} isSave={isSave} link={link}/>)



  return (
      <div className={style.join(" ")} onMouseDown={e=>e.preventDefault()}>
        <NavbarBody err={err}  links={links} setLinks={setLinks} isLoading={isLoading}>
          {arrLinks}
        </NavbarBody>

        <NavbarBtn mod={mod} setMod={setMod}/>
      </div>
  );
};

export default Navbar;