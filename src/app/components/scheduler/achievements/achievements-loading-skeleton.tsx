import React from 'react';
import { Grid } from '@mui/material';
import AchievementSingleLoadingSkeleton from './achievement-single-loading-skeleton';

const AchievementsLoadingSkeletonPage: React.FC = () => {
  const skeletons = [];

  for (let i = 0; i < 12; i++) {
    skeletons.push(
      <Grid
        item
        key={i}
        lg={3}
        md={4}
        sm={6}
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          overflow: 'visible',
        }}
      >
        <AchievementSingleLoadingSkeleton />
      </Grid>
    );
  }

  return <>{skeletons}</>;
};

export default AchievementsLoadingSkeletonPage;