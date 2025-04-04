"use client";

import colors from "@/app/ui/colors";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { AchievementGeneric, UserAchievementNoId } from "../../../lib/types";
import AchievementStars from "./achievement-stars";

const AchievementCardCarousel: React.FC<AchievementGeneric> = ({
  ...props
}) => {
  const { description, stars, name } = props;
  const activeAchievement = stars === 0 ? false : true;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const displayDescription = isSmallScreen
    ? (description || "").length > 55
      ? `${(description || "").slice(0, 55)}...`
      : description
    : description;

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        width: {
          xl: "350px",
          lg: "320px",
          md: "500px",
          sm: "300px",
          xs: "250px",
        },
        height: {
          lg: "175px",
          md: "200px",
          xs: "300px",
        },
        boxShadow: activeAchievement
          ? `0px 0px 5px 5px ${colors.achievements.active.Stroke}`
          : "",
        border: `1px solid ${
          activeAchievement
            ? colors.achievements.active.Stroke
            : colors.achievements.inactive.Stroke
        }`,
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      {/* Overlay */}
      {!activeAchievement && (
        <Box
          sx={{
            position: "absolute", // Absolute positioning to overlay the card's content
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `${colors.achievements.inactive.DisabledCover}`,
            width: "100%",
            height: "100%",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      )}

      <CardContent>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              paddingRight: {
                md: "1em",
                xl: "1.5em",
                sm: "0",
                xs: "0",
              },
              alignItems: "center",
              justifyContent: "center",
              height: {
                sm: "169px",
                md: "129px",
                lg: "120px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: {
                  lg: "120px",
                  md: "110px",
                  sm: "100px",
                  xs: "90px",
                },
                width: {
                  lg: "100px",
                  md: "90px",
                  sm: "80px",
                  xs: "80px",
                },
                overflow: "hidden",
                marginBottom: {
                  lg: "0",
                  md: "0",
                  xs: "0.5em",
                },
                "@media (max-width:475px)": {
                  marginBottom: "0",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  objectFit: "cover",
                  zIndex: 3,
                }}
                image={`/svg/achievements/achievement-thumbnails/${props.image}`}
                alt={props.image}
              />
            </Box>

            <AchievementStars starCount={props.stars} />
          </Box>

          <Box>
            <Typography
              fontFamily="Open Sans"
              variant="h5"
              sx={{
                marginBottom: {
                  lg: "0.5em",
                  md: "0.5em",
                  sm: "0.5em",
                  xs: "10px",
                },
                color: `${
                  activeAchievement
                    ? colors.achievements.active.Color
                    : colors.achievements.inactive.Color
                }`,
              }}
            >
              {props.name}
            </Typography>

            {props.stars === 3 ? (
              <Stack
                direction="row"
                justifyContent="center"
                sx={{ width: "100%" }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "70%",
                    objectFit: "cover",
                    zIndex: 3,
                  }}
                  image={`/svg/achievements/achievement-stars/completed.png`}
                  alt="Achievement Completed!"
                />
              </Stack>
            ) : (
              <Typography
                fontFamily="Open Sans"
                color={`${
                  activeAchievement
                    ? colors.achievements.active.Color
                    : colors.achievements.inactive.Color
                }`}
              >
                {displayDescription}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AchievementCardCarousel;
