import { Box, Stack } from "@mui/material";
import React from "react";

// marginTop: "86px",
interface TutorialBackdropBackgroundProps {
  counter: number;
  activate: boolean;
  isMobile: boolean;
}

const sidebarContainerWidth = {
  xl: "20%",
  lg: "30%",
  md: "0",
  sm: "0",
  xs: "0",
};

// const containerWidth = {
//   xl: "20%",
//   lg: "30%",
//   md: "100%",
//   sm: "100%",
//   xs: "100%"
// };

const SchedulerWidth = {
  xl: "80%",
  lg: "70%",
  md: "100%",
  sm: "100%",
  xs: "100%",
};

const containerHeight = {
  xl: "calc(100vh - 86px)",
  lg: "calc(100vh - 86px)",
  md: "calc(100vh - 86px)",
  sm: "calc(100vh - 86px)",
  xs: "calc(100vh - 86px)",
};

const TutorialBackdropBackground: React.FC<TutorialBackdropBackgroundProps> = ({
  counter,
  activate,
  isMobile,
}) => {
  return (
    <Stack
      direction={"column"}
      sx={{
        position: "absolute", // Ensure it's positioned absolutely
        top: 0,
        left: 0,
        // zIndex: 100, // Place it below all other elements
        width: "100vw", // Match the backdrop width
        height: "100vh", // Match the backdrop height
        // backgroundColor: "red",
      }}
    >
      <Stack height={"86px"} sx={{ width: "100vw" }} direction={"row"}>
        <Box
          sx={{
            height: "86px",
            // width: "100%",
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></Box>
        <Box
          sx={{
            height: "86px",
            width: { xs: "150px", sm: "200px", md: "400px", lg: "500px" },
            maxWidth: 500,
            backgroundColor:
              activate && counter === 3 ? "transparent" : "rgba(0, 0, 0, 0.5)",
          }}
        ></Box>
        <Stack
          sx={{
            height: "86px",
            // width: "100%",
            flex: 1,
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          direction={"row"}
        >
          <Box
            sx={{
              height: "86px",
              // width: "100%",
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></Box>
          <Box
            sx={{
              height: "86px",
              width: "86px",
              backgroundColor:
              activate && isMobile && counter === 1
                ? "transparent"
                : "rgba(0, 0, 0, 0.5)",
            }}
          ></Box>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          // width: "calc(100vh - 86px)",
          height: "calc(100vh - 86px)",

        }}
      >
        <Box
          sx={{
            width: {
              ...sidebarContainerWidth,
            },
            backgroundColor:
              activate && !isMobile && counter === 1
                ? "transparent"
                : "rgba(0, 0, 0, 0.5)",
            height: "100%",
          }}
        ></Box>
        <Box
          sx={{
            width: {
              ...SchedulerWidth,
            },
            backgroundColor:
              activate && counter === 2 ? "transparent" : "rgba(0, 0, 0, 0.5)",
            height: "100%",
          }}
        ></Box>
      </Stack>
    </Stack>
  );
};

export default TutorialBackdropBackground;
