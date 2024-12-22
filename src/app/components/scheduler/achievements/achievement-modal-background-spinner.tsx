import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";


const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const AchievementModalSpinner: React.FC = () => {
  const lines = Array.from({ length: 10 });

  return (
    <Box
      sx={{
        position: "absolute",
        width: "200px",
        height: "200px",
        margin: "0 auto",
        zIndex: "1",
        animation: `${spinAnimation} 2s linear infinite`,
      }}
    >
      {lines.map((_, index) => {
        const angle = (index / lines.length) * 360;
        const length = 280;

        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              borderLeft: "20px solid transparent",
              top: "50%",
              left: "50%",
              width: "10px",
              height: `${length}px`,
              background: "linear-gradient(to bottom, rgba(235, 228, 25,0), rgba(235, 228, 25,1))", // Gradient effect
              transformOrigin: "center top",
              transform: `rotate(${angle}deg) translate(-50%, -100%)`,
            }}
          />
        );
      })}
    </Box>
  );
};

export default AchievementModalSpinner;
