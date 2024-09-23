import { setTasks, setSelectedTask } from '@/app/redux/tasks-slice';
import type { Task }from '@/app/lib/types';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';