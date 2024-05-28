'use client'
import { useEffect, useState } from "react";
import SidebarCalendars from "../components/calendar/calendars-sidebar";
import UserScheduler from "../components/scheduler/user-scheduler";
import dynamic from "next/dynamic";

// export const dynamic = 'force-dynamic'


const Scheduler = dynamic(
  () => import('../components/scheduler/user-scheduler'),
  { ssr: false },
)

const CalendarSideMenu = dynamic(
  () => import('../components/calendar/calendars-sidebar'),
  { ssr: false },
)

function ProtectedPage() {
  // const [windowWidth, setWindowWidth] = useState<boolean>(() => window.innerWidth <= 576)

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowWidth(window.innerWidth <= 576)
  //   }
  //   handleResize()

  //   window.addEventListener('resize', handleResize)

  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
      {/* {!windowWidth ?  <CalendarSideMenu/> : null} */}
      <CalendarSideMenu/> 
      <Scheduler />
    </div>
  )
}

export default ProtectedPage;
