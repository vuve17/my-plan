'use client'

import Scheduler from "../components/scheduler";
import { useEffect, useState } from "react";
import SidebarCalendars from "../components/calendars-sidebar";

export const dynamic = 'force-dynamic'

function ProtectedPage() {
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
  return (

    <div style={{ display: "flex", flexDirection: "row"}}>
      {!windowWidth ? <SidebarCalendars/> : null}
      <Scheduler
      // smallDevice={smallDevice}
      />
    </div>
  )
}

export default ProtectedPage;