'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import AchievementCard from '@/app/components/achievement-card';
import { Achievement } from '@/app/lib/types';


const AchievementPage: React.FC = () => {

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const initialized = useRef(false)
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("try")
                const response = await fetch('/api/achievements', {
                    method: 'GET',
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    // console.log(jsonResponse);
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


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Grid container 
            sx={{
                margin: {
                    lg: "2em",
                    sm: "1em",
                    xs: "1em 0.5em"
                },
                maxWidth: "1500px"
            }}
            // spacing={3}
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
