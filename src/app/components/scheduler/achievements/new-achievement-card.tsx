"use client";

import colors from "@/app/ui/colors";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { UserAchievementNoId } from "../../../lib/types";



const NewAchievementCard: React.FC<UserAchievementNoId> = ({
  description,
  stars,
  name,
  image,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const truncatedDescription =
    isSmallScreen && description.length > 55
      ? `${description.slice(0, 55)}...`
      : description;

      const AchievementStars = () => (
        <CardMedia
          component="img"
          image={`/svg/achievements/achievement-stars/${stars}-star.svg`}
          alt={`${stars}-star`}
          sx={{
            width: "69.82px",
            height: "42px",
            zIndex: 4,
            marginTop: "-2em"
          }}
        />
      );

  return (
    <Card
      variant="outlined"
      sx={{
        width: "350px" ,
        height:  "175px",
        boxShadow: `0px 0px 20px yellow`,
        border: `1px solid ${colors.darkGrey}`,
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Thumbnail and Stars Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "1em" ,
            }}
          >
            <CardMedia
              component="img"
              image={`/svg/achievements/achievement-thumbnails/${image}`}
              alt={image}
              sx={{
                width: "100px",
                height: "120px",
                objectFit: "cover",
                zIndex: 3,
              }}
            />
            <AchievementStars />
          </Box>

          {/* Text Section */}
          <Box>
            <Typography
              variant="h5"
              fontFamily="Open Sans"
              sx={{
                marginBottom: "0.5em",
                color: colors.achievements.active.Color,
              }}
            >
              {name}
            </Typography>
            <Typography
              fontFamily="Open Sans"
              color={colors.achievements.active.Color}
            >
              {truncatedDescription}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewAchievementCard;
