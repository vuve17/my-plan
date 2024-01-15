'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarCalendars from "../components/calendars-sidebar";
import Scheduler from "../components/scheduler";



function ProtectedPage() {

  const smallDevice = window.matchMedia('(max-width: 576px)').matches
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
      {!smallDevice ? <SidebarCalendars/> : null}
      <Scheduler
      smallDevice={smallDevice}
      />
    </div>
  )
}

export default ProtectedPage;