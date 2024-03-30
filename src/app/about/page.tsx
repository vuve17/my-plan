'use client'

import React, {useEffect, useState} from "react";
import TaskMenu from "@/app/components/task-menu";
import SidebarCalendars from "../components/calendar/calendars-sidebar";

export const dynamic = 'force-dynamic'

const AboutPage: React.FC = () => {
    const[windowWidth, setWindowWidth] = useState<boolean>()
    
    function handleWindowWidth(window: boolean){
        setWindowWidth(window)
    }

    useEffect( function getWindow()
    {
        const smallDevice = window.matchMedia('(max-width: 576px)').matches
        handleWindowWidth(smallDevice)
        console.log(smallDevice)
    }
    ,[])

    return(
        <>
            <SidebarCalendars device={windowWidth}/>
            {/* <TaskMenu device={windowWidth} /> */}
        </>
    )
}

export default AboutPage