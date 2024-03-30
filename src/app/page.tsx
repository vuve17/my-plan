'use client'

import React from 'react';
import CustomTestInput from "./components/test/custom-input-test";
import UserScheduler from './components/scheduler/user-scheduler'

export const dynamic = "force-dynamic"

const newDate = new Date("Wed Jan 24 2024 12:39:38 GMT+0100 (srednjoeuropsko standardno vrijeme)");
export default function Page() {
    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
            <CustomTestInput />
            <UserScheduler />
        </div>
    )
}
