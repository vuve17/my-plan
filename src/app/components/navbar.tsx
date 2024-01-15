'use client'

import React, { useState } from 'react';
import NavLinks from '../ui/nav-links';

const NavBar: React.FC = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isAnimationOver, setAnimationOver] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    if(isSidebarActive)
    {
      setTimeout(() => {
        setAnimationOver(!isSidebarActive)
      }, 500)

    }
    else{
      setAnimationOver(!isSidebarActive)
    }
    
  };

  return (
    <>
      <div
        className={`blure_div_on_open_nav `}
        style={{visibility: `${isSidebarActive ? 'visible' : 'hidden'}`}}
        onClick={toggleSidebar}
      >

      </div>
      <div className="content" id='navContent'>
        <nav className="navbar navbar-expand-lg " id='navbarTop'>
          <div className="container-fluid ">
            <a type="button" id="sidebarCollapse" onClick={toggleSidebar}>
              <i className="fas fa-align-left">
                <img src="..\svg\hamburger-menu.svg" id="hamburger_menu" alt="Hamburger Menu" />
              </i>
            </a>
          </div>
        </nav>
      </div>
      <div className={`openSansSemiBold wrapper ${isSidebarActive ? 'active' : ''}`} id='sidebarWrapper'
        style={{visibility: `${isAnimationOver ? "visible" : "hidden"}`}}
      >
        <nav id="sidebar" className={`${isSidebarActive ? "active" : ""}`}>
            <NavLinks onClick={toggleSidebar}/>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
