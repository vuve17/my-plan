'use client'

import Cookies from "js-cookie"

export const dynamic = 'force-dynamic'

export default async function getTasks() {
    const token = Cookies.get("refreshToken")
    const response = await fetch('/api/get-tasks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    })
    if(response.ok){
        const data = await response.json();
        if (data.hasOwnProperty('tasks')) {
            const tasks = await data.tasks
            console.log(tasks)
            return tasks
        }
    }
    else{
        console.error("failed to fetch tasks")
    }
}