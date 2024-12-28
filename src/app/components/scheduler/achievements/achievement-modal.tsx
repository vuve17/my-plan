"use client";

import { UserAchievementNoId } from "@/app/lib/types";
import { Backdrop, Box, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactCurvedText from "react-curved-text";
import AchievementModalSpinner from "./achievement-modal-background-spinner";
import NewAchievementCard from "./new-achievement-card";

interface AchievementModalProps {
  achievement: UserAchievementNoId;
  open?: boolean;
  onClose?: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({
  achievement,
  open,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsVisible(true), 0); // Trigger animation on mount
      return () => clearTimeout(timer); // Cleanup timeout
    } else {
      setIsVisible(false); // Reset state when modal closes
    }
  }, [open]);

  return (
            <Box
                width="100vw" 
                height="100vh"
                
                sx={{
                    position: "fixed", 
                    top: 0, 
                    left: 0,
                    zIndex:100,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center"
                }}
                onClick={onClose}
            >
    <Backdrop open={true}>
      <Stack
        display="flex"
        alignItems="center"
        position="absolute"
        sx={{
          paddingTop: "2em",
          zIndex: "40",
          marginTop: "-10em",
          transform: isVisible ? "scale(1)" : "scale(0.1)", // Apply scaling
          opacity: isVisible ? 1 : 0, // Fade-in effect
          transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out", // Smooth transition
        }}
      >
        <ReactCurvedText
          width={600}
          height={300}
          cx={300} // Center x-coordinate of the ellipse
          cy={175} // Center y-coordinate of the ellipse
          rx={200} // Horizontal radius of the ellipse (large value for a "line-like" curve)
          ry={140} // Vertical radius of the ellipse (small value for a shallow curve)
          startOffset={60} // Adjust where the text starts along the curve
          reversed={true}
          text="NEW ACHIEVEMENT"
          textProps={{
            style: {
              position: "relative",
              marginTop: "2em",
              fontSize: "50px",
              fontFamily: "monospace",
              fontWeight: "bold",
              fill: "white",
              stroke: "black",
              strokeWidth: 1,
              overflowY: "visible",
            },
          }}
        />

        <Box sx={{ position: "relative", marginTop: "-10em" }}>
          <NewAchievementCard
            id={achievement.id}
            name={achievement.name}
            image={achievement.image}
            description={achievement.description}
            stars={achievement.stars}
          />
        </Box>
      </Stack>

      <AchievementModalSpinner />
    </Backdrop>
    </Box>
  );
};

export default AchievementModal;
