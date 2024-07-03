'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import AchievementCard from '@/app/components/scheduler/achievements/achievement-card';
import { Achievement } from '@/app/lib/types';
import Cookies from "js-cookie";

export const dynamic = 'force-dynamic'

const AchievementPage: React.FC = () => {

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const initialized = useRef(false)
    const [loading, setLoading] = useState<boolean>(true); 
    const refreshCookie = Cookies.get("refreshToken")
    const accessCookie = Cookies.get("accessToken")
    const webCookies = {refreshCookie, accessCookie}


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
                    const jsonResponse = await response.json();
                    console.log("res ok");
                    setAchievements(jsonResponse.achievementsArray)
                    console.log(achievements);
                    setLoading(false);

                }
            } catch (error) {
                console.error('Error reading JSON:', error);
            }
        };
        if (!initialized.current) {
            initialized.current = true
            fetchData();
        }
    }, [achievements]);
    //	f4849010-09b0-4687-8b50-c70828b4d914
    // f4849010-09b0-4687-8b50-c70828b4d914

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "80px"}}>
            <Grid container 
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
                    achievements.map((achievement) => (
                        
                        <Grid item key={achievement.id} lg={3} md={4} sm={6} xs={6}
                        onClick={()=> console.log(achievement.id)}
                        sx={{
                            marginBottom: {
                                lg: "1em",
                                sm: "1em",
                                xs: "1em"
                            },
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

                    ))
                )}
            </Grid>
        </div>
    );
}

export default AchievementPage
