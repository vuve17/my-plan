"use client";

import AchievementCardCarousel from "@/app/components/scheduler/achievements/achievement-card-carousel";
import AchievementCarousel from "@/app/components/scheduler/achievements/achievements-carousel";
import AchievementsLoadingSkeletonPage from "@/app/components/scheduler/achievements/achievements-loading-skeleton";
import { getAchievementDetails } from "@/app/lib/achievement-functions";
import { UserAchievement } from "@/app/lib/types";
import { setReduxAchievements } from "@/app/redux/achievements-slice";
import { RootState } from "@/app/redux/store";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AchievementsApiresponse {
  achievementsArray: UserAchievement[];
  status: number;
}

export const dynamic = "force-dynamic";

const AchievementPage: React.FC = () => {
  const dispatch = useDispatch();
  const achievementsRedux = useSelector(
    (state: RootState) => state.achievements.achievements
  );
  const initialized = useRef(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openCarousel, setOpenCarousel] = useState<boolean>(false);
  const [selectedAchievement, setSelectedAchievement] = useState<number>(0);
  const refreshCookie = Cookies.get("refreshToken");
  const accessCookie = Cookies.get("accessToken");

  const achievementCardsArray: React.ReactNode[] = useMemo(() => {
    return achievementsRedux.map((achievement) => {
      const { image, description } = getAchievementDetails(achievement);

      return (
        <div key={achievement.id} style={{ overflow: "hidden" }}>
          <AchievementCardCarousel
            id={achievement.id}
            name={achievement.name}
            image={image} // ✅ Correctly accessing the image
            description={description} // ✅ Correctly accessing the description
            stars={achievement.stars}
          />
        </div>
      );
    });
  }, [achievementsRedux]);

  const memorizeAchievements = useMemo(() => {
    return achievementsRedux.map((achievement, index) => {
      console.log(achievement);
      const { image, description } = getAchievementDetails(achievement);
      return (
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
            overflow: "visible",
          }}
        >
          <AchievementCardCarousel
            id={achievement.id}
            name={achievement.name}
            image={image}
            description={description}
            stars={achievement.stars}
          />
        </Grid>
      );
    });
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
        const response = await fetch("/api/achievements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            refreshToken: refreshCookie || "",
            accessToken: accessCookie || "",
          },
        });
        if (response.ok) {
          const jsonResponse: AchievementsApiresponse = await response.json();
          console.log(
            "jsonResponse ACHIEVEMENTSSS: ",
            jsonResponse.achievementsArray
          );
          if (jsonResponse.achievementsArray.length > 0) {
            dispatch(setReduxAchievements(jsonResponse.achievementsArray));
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Error reading JSON:", error);
      }
    };
    if (!initialized.current) {
      fetchData();
      initialized.current = true;
    }
  }, [achievementsRedux]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
    >
      {/* <UserLevelProgressBar /> */}
      <Grid
        container
        spacing={2}
        sx={{
          margin: {
            lg: "2em",
            sm: "1em",
            xs: "1em 0.5em",
          },
          maxWidth: "1500px",
        }}
      >
        {loading ? <AchievementsLoadingSkeletonPage /> : memorizeAchievements}
      </Grid>
      <AchievementCarousel
        achievements={achievementCardsArray}
        initialActiveIndex={selectedAchievement}
        open={openCarousel}
        hlandleClose={handleCarouselClosing}
      />
    </div>
  );
};

export default AchievementPage;
