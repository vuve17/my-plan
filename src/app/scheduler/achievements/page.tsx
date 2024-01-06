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
                    method: 'POST',
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

    setTimeout(() => {
        console.log(achievements)
    }, 2000)
    return (
        <>
            <Grid container>
                {loading ? (
                <p>Loading...</p>
            ) : (
                    achievements.map((achievement, index) => (
                        <Grid item key={index} lg={3} md={4} sm={6} xs={6}>
                            <AchievementCard 
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
        </>
    );

}

export default AchievementPage
