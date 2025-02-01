"use client";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Scheduler = dynamic(
  () => import("../components/scheduler/user-scheduler"),
  { ssr: false }
);

const CalendarSideMenu = dynamic(
  () => import("../components/calendar/calendars-sidebar"),
  { ssr: false }
);

function ProtectedPage() {
  // const schedulerVisibility = useSelector(
  //   (state: RootState) => state.schedulerVisibility.schedulerVisibility
  // );
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);
  const schedulerVisibility = useSelector(
    (state: RootState) => state.schedulerVisibility.schedulerVisibility
  );

  return (
    <>
      {isMobile && schedulerVisibility ? <CalendarSideMenu /> : null}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          marginTop: "79px",
        }}
      >
        {!isMobile ? <CalendarSideMenu /> : null}
        <Scheduler />
      </div>
    </>
  );
}

export default ProtectedPage;
