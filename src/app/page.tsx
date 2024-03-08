'use client'

import SchedulerSmall from "./components/scheduler-small-device";
import UserScheduler from "./components/scheduler/user-scheduler";
import SidebarCalendars from "./components/calendars-sidebar";

export const dynamic = 'force-dynamic'

const newDate = new Date( "Wed Jan 24 2024 12:39:38 GMT+0100 (srednjoeuropsko standardno vrijeme)")
export default function Page() {
    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
            {/* <SidebarCalendars /> */}
            <UserScheduler />
        </div>
    )
}