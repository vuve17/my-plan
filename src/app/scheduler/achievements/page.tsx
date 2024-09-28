'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Grid } from '@mui/material';
import AchievementCard from '@/app/components/scheduler/achievements/achievement-card';
import { Achievement } from '@/app/lib/types';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setReduxAchievements } from '@/app/redux/achievements-slice';
import { NextResponse } from 'next/server';

interface AchievementsApiresponse {
    achievementsArray: Achievement[],
    status: number 
}

export const dynamic = 'force-dynamic'

const AchievementPage: React.FC = () => {

    const dispatch = useDispatch()
    const achievementsRedux = useSelector((state: RootState) => state.achievements.achievements)
    const initialized = useRef(false)
    const [loading, setLoading] = useState<boolean>(true); 
    const refreshCookie = Cookies.get("refreshToken")
    const accessCookie = Cookies.get("accessToken")

    const memorizeAchievements = useMemo(() => {
        return achievementsRedux.map((achievement) => (
            <Grid item key={achievement.id} lg={3} md={4} sm={6} xs={6} 
                onClick={() => console.log(achievement.id)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <AchievementCard 
                    key={achievement.id}
                    id={achievement.id}
                    name={achievement.name} 
                    image={achievement.image} 
                    description={achievement.description} 
                    stars={achievement.stars}
                />
            </Grid>
        ));
    }, [achievementsRedux]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("try")
                const response = await fetch('/api/achievements', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'refreshToken': refreshCookie || '',
                        'accessToken': accessCookie || '',
                    },
                });
                if (response.ok) {
                    const jsonResponse : AchievementsApiresponse = await response.json();
                    console.log("jsonResponse: ", jsonResponse)
                    dispatch(setReduxAchievements(jsonResponse ? jsonResponse.achievementsArray : []))
                    // setAchievements(jsonResponse.achievementsArray)
                    console.log(achievementsRedux);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error reading JSON:', error);
            }
        };
        if (!initialized.current) {
            fetchData();
            initialized.current = true
        }
    }, [achievementsRedux]);
    //	f4849010-09b0-4687-8b50-c70828b4d914
    // f4849010-09b0-4687-8b50-c70828b4d914

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "80px"}}>
            <Grid container spacing={2}
            sx={{
                margin: {
                    lg: "2em",
                    sm: "1em",
                    xs: "1em 0.5em"
                },
                maxWidth: "1500px"
            }}
            >
                
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    memorizeAchievements
                )}
            
            </Grid>
        </div>
    );
}

export default AchievementPage



// Array.isArray(achievementsRedux) ? 
// (
// achievementsRedux.map((achievement) => (
        
//         <Grid item key={achievement.id} lg={3} md={4} sm={6} xs={6} 
//         onClick={()=> console.log(achievement.id)}
//         sx={{
//             display: "flex",
//             justifyContent: "center",
//         }}

//         >
//             <AchievementCard 
//                 key={achievement.id}
//                 id={achievement.id}
//                 name={achievement.name} 
//                 image={achievement.image} 
//                 description={achievement.description} 
//                 stars={achievement.stars}
//             />
//         </Grid>

//     ))

// ) :  (


// <Grid item key={achievementsRedux.id} lg={3} md={4} sm={6} xs={6} 
// onClick={()=> console.log(achievementsRedux.id)}
// sx={{
//     display: "flex",
//     justifyContent: "center",
// }}

// >
//     <AchievementCard 
//         key={achievementsRedux.id}
//         id={achievementsRedux.id}
//         name={achievementsRedux.name} 
//         image={achievementsRedux.image} 
//         description={achievementsRedux.description} 
//         stars={achievementsRedux.stars}
//     />
// </Grid>

// )

// )