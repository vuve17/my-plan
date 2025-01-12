import React from 'react';
import { Card, Skeleton } from '@mui/material';

const AchievementSingleLoadingSkeleton: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        width: {
          xl: "350px",
          lg: "320px",
          md: "100%",
          sm: "100%",
          xs: "100%",
        },
        height: {
          lg: "175px",
          md: "200px",
          xs: "300px",
        },
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{
          borderRadius: "4px",
        }}
      />
    </Card>
  );
};

export default AchievementSingleLoadingSkeleton;