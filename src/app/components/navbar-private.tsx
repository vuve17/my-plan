'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import colors from '../ui/colors';
import NavLinksPrivate from '../ui/nav-links-private';
import { useDispatch, useSelector } from 'react-redux';
import { setSchedulerVisibility } from '../redux/scheduler-visibility-slice';
import { RootState } from "@/app/redux/store";


interface NavbarProps  {
    deviceSmall?: boolean
}

const NavBar: React.FC <NavbarProps> = ({...props}) => {
  const [isSidebarActive, setIsSideBarActive] = useState(false)
  const schedulerVisibility = useSelector((state : RootState) => state.schedulerVisibility.schedulerVisibility)
  const dispatch = useDispatch()

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
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </i>
              </button>
              <button
                id="sidebarCollapse"
                onClick={() => dispatch(setSchedulerVisibility(!schedulerVisibility))}
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

                  <NavLinksPrivate onClick={toggleSidebar}/>
          </nav>
          </div>
</>
  );
};

export default NavBar;


