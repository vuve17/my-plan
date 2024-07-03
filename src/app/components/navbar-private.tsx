
'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import colors from '../ui/colors';
import NavLinksPrivate from '../ui/nav-links-private';

interface NavbarProps  {
    deviceSmall?: boolean
}

async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            console.log('Logged out successfully');
            window.location.href = '/login';
        } else {
            const data = await response.json();
            console.error('Logout failed:', data.message);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


const NavBar: React.FC <NavbarProps> = ({...props}) => {
  const [isSidebarActive, setIsSideBarActive] = useState(false)

  const toggleSidebar = () => {
    setIsSideBarActive(!isSidebarActive)
  };

  return (

<>
        <div
          className={`blure_div_on_open_nav `}
          style={{visibility: `${isSidebarActive ? 'visible' : 'hidden'}`, }}
          onClick={toggleSidebar}
        />
        <div 
          className="w-full flex-none md:w-64"
          style={{position: "fixed" , width: "100vw", top: 0, right: 0, zIndex: 100, }}
        >
        
        <div className="" id='navContent' >
          <nav className="navbar navbar-expand-lg " id='navbarTop'>
            <div className="container-fluid " style={{ 
              display: 'flex', justifyContent: "space-between",
            }}>
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
              <button
                id="sidebarCollapse"
                onClick={toggleSidebar}
                style={{
                  visibility: props.deviceSmall ? "visible" : "hidden"
                }}
              >
  
                  <DateRangeOutlinedIcon 
                      id="calendar_menu" 
                      
                      sx={{
                        color: colors.white,
                        fontSize: '40px',
                      }}
                  />
              </button>
            </div>
          </nav>
        </div>
          <nav id="sidebar" className={`${isSidebarActive ? "active" : ""}`}>
                  <Link
                    key="logout"
                    href='/'
                    onClick={() => logout()}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginLeft: "2em"
                    }}
                  >
                    Log out
                  </Link>
                  <NavLinksPrivate onClick={toggleSidebar}/>
          </nav>
          </div>
</>
  );
};

export default NavBar;


