"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarCalendars from "../components/calendars-sidebar";
import Scheduler from "../components/scheduler";

function ProtectedPage() {

  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
      <SidebarCalendars />
      <Scheduler />
    </div>
  )
}

export default ProtectedPage;