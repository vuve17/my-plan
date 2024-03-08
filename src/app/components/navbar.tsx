'use client'

import React, { useState } from 'react';
import NavLinks from '../ui/nav-links';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const [isSidebarActive, setIsSideBarActive] = useState(false)

  const toggleSidebar = () => {
    setIsSideBarActive(!isSidebarActive)
  };

  return (
    <>
      <div
        className={`blure_div_on_open_nav `}
        style={{visibility: `${isSidebarActive ? 'visible' : 'hidden'}`}}
        onClick={toggleSidebar}
      />
      <div className="content" id='navContent'>
        <nav className="navbar navbar-expand-lg " id='navbarTop'>
          <div className="container-fluid ">
            <button
              id="sidebarCollapse"
              onClick={toggleSidebar}
            >
              <i className="fas fa-align-left">
                <Image 
                  src="..\svg\hamburger-menu.svg"
                  id="hamburger_menu" 
                  alt="Hamburger Menu"
                  width={40}
                  height={40} 
                  priority
                />
              </i>
            </button>
          </div>
        </nav>
      </div>
        <nav id="sidebar" className={`${isSidebarActive ? "active" : ""}`}>
            <NavLinks onClick={toggleSidebar}/>
        </nav>
    </>
  );
};

export default NavBar;
