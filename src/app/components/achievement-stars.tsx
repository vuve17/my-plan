import React from "react";
import { CardMedia } from "@mui/material";

interface AchievementStarsProps {
    starCount: 0 | 1 | 2 | 3;
}

const AchievementStars: React.FC<AchievementStarsProps> = ({ starCount }) => {
    return(

        <CardMedia
        component="img"
        image={`/svg/achievements/achievement-stars/${starCount}-star.svg`}
        className={`${starCount}-star`}
        sx={{
            position: {
                lg: "absolute",
                md: "absolute",
                sm: "relative"
            },
            width: {
                lg: "69.82px",
                sm: "69.82px",
                xs: "60px",
            },
            height:{
                lg: "42px",
                sm: "43px",
                xs: "38px",
            },
            zIndex: "4",
            bottom: {
                lg: "0",
                md: "0",
                xs: "0",
            },
            marginBottom:{
                md:"0",
                xs: "1em"
            },
            
        }}
        />

    )
}

export default AchievementStars