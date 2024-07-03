'use client'

import React from 'react';
import CustomTestInput from "./components/test/custom-input-test";
import UserScheduler from './components/scheduler/user-scheduler'
import { useState  } from 'react';
import { Button } from '@mui/material';
import DatePickerInput from './components/test/custom-input-test-ts';
import SidebarCalendars from './components/calendar/calendars-sidebar';
import Bookmark from './components/scheduler/scheduler_utils/bookmark';
import NavBar from './components/navbar-public';


export const dynamic = "force-dynamic"

interface ApiResponse {
    eventTimeTz: string;
    message?: string;
}

export default function Page() {


    return (
        
        <>
        <NavBar />
            <div style={{ display: "flex", flexDirection: "row", position: "relative"}}>
                
                {/* <Button
                onClick={insertDateInDb}
                >
                    click me
                </Button> */}
    
                {/* <SidebarCalendars /> */}

                <UserScheduler />
    
                {/* <Bookmark 
                /> */}
            </div>
        </>
    )
}



























// const [message, setMessage] = useState("");

// async function insertDateInDb () {
//     //https://github.com/vercel/vercel/discussions/9093

//     try{
//     const newDate = new Date();  
//     const response = await fetch('/api/date-test', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json', 
//         },
//         body: JSON.stringify({
//             date: newDate
//         })
//     });

//     if(response.ok)
//     {
//         const responseData: ApiResponse  = await response.json();
//         console.log("id 34 date from query: ", responseData.eventTimeTz)
//         console.log("done")
//     }
//     }
//     catch(error)
//     {
//         if(error)
//             {
//                 setMessage(error.toString())
//             }
        
//     }
// }