'use client';

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import colors from '@/app/ui/colors';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { calculateProgressBarValue } from '@/app/lib/level-progress-calc-func';

const UserLevelProgressBar: React.FC = () => {
  const dispatch = useDispatch();
  const level = useSelector((state: RootState) => state.user.level);
  const xp = useSelector((state: RootState) => state.user.xp);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5, 
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#1a90ff',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: `${colors.white}`,
    },
  }));

  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
      <Typography color={colors.white} fontWeight="bold">
        Level {level}
      </Typography>

      <Box sx={{ width: { xs: "150px", sm: "200px", md: "400px", lg: "500px"}, maxWidth: 500 }}>
        <BorderLinearProgress variant="determinate" value={calculateProgressBarValue(xp)} />
      </Box>
    </Stack>
  );
};

export default UserLevelProgressBar;
