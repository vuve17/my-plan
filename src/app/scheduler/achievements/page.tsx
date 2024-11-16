'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Grid } from '@mui/material';
import AchievementCard from '@/app/components/scheduler/achievements/achievement-card';
import { Achievement } from '@/app/lib/types';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setReduxAchievements } from '@/app/redux/achievements-slice';
import AchievementCarousel from '@/app/components/scheduler/achievements/achievements-carousel';

interface AchievementsApiresponse {
    achievementsArray: Achievement[],
    status: number,
}

export const dynamic = 'force-dynamic'

const AchievementPage: React.FC = () => {

    const dispatch = useDispatch();
    const achievementsRedux = useSelector((state: RootState) => state.achievements.achievements);
    const initialized = useRef(false);
    const [loading, setLoading] = useState<boolean>(true); 
    const [openCarousel, setOpenCarousel] = useState<boolean>(false); 
    const [selectedAchievement, setSelectedAchievement] = useState<number>(0); 
    const refreshCookie = Cookies.get("refreshToken");
    const accessCookie = Cookies.get("accessToken");

    const achievementCardsArray: React.ReactNode[] = useMemo(() => {
        return achievementsRedux.map((achievement, index) => (
            <div key={achievement.id}>
                <AchievementCard
                    id={achievement.id}
                    name={achievement.name}
                    image={achievement.image}
                    description={achievement.description}
                    stars={achievement.stars}
                />
            </div>
        ));
    }, [achievementsRedux]);

    const memorizeAchievements = useMemo(() => {
        return achievementsRedux.map((achievement, index) => (
            <Grid
                item
                key={achievement.id}
                lg={3}
                md={4}
                sm={6}
                xs={6}
                onClick={() => handleCarouselOpening(index)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <AchievementCard
                    id={achievement.id}
                    name={achievement.name}
                    image={achievement.image}
                    description={achievement.description}
                    stars={achievement.stars}
                />
            </Grid>
        ));
    }, [achievementsRedux]);

    function handleCarouselOpening(selected: number) {
        setSelectedAchievement(selected);
        setOpenCarousel(true);
    }

    function handleCarouselClosing() {
        setOpenCarousel(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/achievements', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'refreshToken': refreshCookie || '',
                        'accessToken': accessCookie || '',
                    },
                });
                if (response.ok) {
                    const jsonResponse: AchievementsApiresponse = await response.json();
                    dispatch(setReduxAchievements(jsonResponse ? jsonResponse.achievementsArray : []));
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error reading JSON:', error);
            }
        };
        if (!initialized.current) {
            fetchData();
            initialized.current = true;
        }
    }, [achievementsRedux]);

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
            <Grid
                container
                spacing={2}
                sx={{
                    margin: {
                        lg: "2em",
                        sm: "1em",
                        xs: "1em 0.5em"
                    },
                    maxWidth: "1500px"
                }}
            >
                {loading ? <p>Loading...</p> : memorizeAchievements}
            </Grid>
            {/* {openCarousel && (
                <AchievementCarousel
                    achievements={achievementCardsArray}
                    initialActiveIndex={selectedAchievement}
                    open={openCarousel}
                    hlandleClose={handleCarouselClosing}
                />
            )} */}
            <AchievementCarousel 
                achievements={achievementCardsArray}
                initialActiveIndex={selectedAchievement}
                open={openCarousel}
                hlandleClose={handleCarouselClosing}
            />
        </div>
    );
}

export default AchievementPage;
