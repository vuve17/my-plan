'use client'

import React, { useState } from 'react';
import NavLinksPublic from '../ui/nav-links-public';
import Image from 'next/image';


const NavBar: React.FC = () => {
  const [isSidebarActive, setIsSideBarActive] = useState(false)

  const toggleSidebar = () => {
    setIsSideBarActive(!isSidebarActive)
  };

  return (
  <>
        <div 
          className="w-full flex-none md:w-64"
          style={{position: "fixed" , width: "100vw", top: 0, right: 0, zIndex: 100, }}
        >
          <div
              className={`blure_div_on_open_nav `}
              style={{visibility: `${isSidebarActive ? 'visible' : 'hidden'}`}}
              onClick={toggleSidebar}
          />
          <div className="content" id='navContent'>
            <nav className="navbar navbar-expand-lg" id='navbarTop'>
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
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </i>
                </button>
              </div>
            </nav>
          </div>
            <nav id="sidebar" className={`${isSidebarActive ? "active" : ""}`}>
                <NavLinksPublic onClick={toggleSidebar}/>
            </nav>
      </div>
  </>
  );
};

export default NavBar;
