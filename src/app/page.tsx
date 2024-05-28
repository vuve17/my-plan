'use client'

import React from 'react';
import CustomTestInput from "./components/test/custom-input-test";
import UserScheduler from './components/scheduler/user-scheduler'
import { useState } from 'react';
import { Button } from '@mui/material';
import DatePickerInput from './components/test/custom-input-test-ts';


export const dynamic = "force-dynamic"

interface ApiResponse {
    eventTimeTz: string;
    message?: string;
}

export default function Page() {

    const [message, setMessage] = useState("");

    async function insertDateInDb () {
        //https://github.com/vercel/vercel/discussions/9093

        try{
        const newDate = new Date();  
        const response = await fetch('/api/date-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                date: newDate
            })
        });

        if(response.ok)
        {
            const responseData: ApiResponse  = await response.json();
            console.log("id 34 date from query: ", responseData.eventTimeTz)
            console.log("done")
        }
        }
        catch(error)
        {
            if(error)
                {
                    setMessage(error.toString())
                }
            
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ width: "100%"}}>Test text</div>
            <Button
            onClick={insertDateInDb}
            >
                click me
            </Button>
            {/* <DatePickerInput
            /> */}
        </div>
    )
}
