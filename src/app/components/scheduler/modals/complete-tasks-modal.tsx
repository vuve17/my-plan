import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
  IconButton,
  Typography,
  Snackbar,
} from '@mui/material';
import { Task } from '@/app/lib/types';
import { formatDate } from '@/app/lib/user-tasks-functions';
import colors from '@/app/ui/colors';
import Cookies from "js-cookie";
import { RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSnackBarOpen, setSnackBarText, setSnackbarAlertState } from '@/app/redux/snackbar-slice';

interface CompleteTasksDialogProps {
  tasks: Task[];
  open: boolean;
  onClose: () => void;
}

const CompleteTasksDialog: React.FC<CompleteTasksDialogProps> = ({ tasks, open, onClose }) => {
  console.log("tasks: ", tasks);
  const [checked, setChecked] = React.useState<number[]>([]);
  const taskIds : number[] = []
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isSnackBarOpen
  );
  const snackbarText = useSelector(
    (state: RootState) => state.snackbar.snackbarText
  );
  const snackbarAlertState: "success" | "warning" | "error" = useSelector(
    (state: RootState) => state.snackbar.snackbarAlertState
  );
    const handleSnackbarClose = () => {
      dispatch(setIsSnackBarOpen(false));
    };
  
  const handleToggle = (taskId: number) => () => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = async () => {
    const token = Cookies.get("refreshToken");
    console.log("taskIds: ", taskIds);
    try {
      const response = await fetch('/api/complete-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskIds: taskIds,
          completedTaskIds: checked
        })
    });
    dispatch(setSnackBarText("Tasks completed successfully"));
    dispatch(setSnackbarAlertState("success"));
    dispatch(setIsSnackBarOpen(true));
    } catch {
      dispatch(setSnackBarText("Error completing tasks"));
      dispatch(setSnackbarAlertState("error"));
      dispatch(setIsSnackBarOpen(true));
    }
    onClose();
  };

  return (
          <>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
        maxWidth="sm"
        open={open}
        onClose={handleCancel}
      >
        <DialogTitle>Select tasks You have completed</DialogTitle>
        <DialogContent dividers>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task) => {
              const labelId = `checkbox-list-label-${task.id}`;
              const date = `${formatDate(task.startDate)} - ${formatDate(task.endDate)}`;
              taskIds.push(task.id);
              return (
                <ListItem
                  key={task.id}
                  disablePadding
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <Chip
                        label={task.taskType}
                        size="small"
                        sx={{
                          bgcolor: `${task.taskType === 'chore' ? colors.chore : colors.event}`,
                          color: 'white',
                          marginTop: '4px',
                        }}
                      />
                    </IconButton>
                  }
                >
                  <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(task.id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                          {task.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ display: 'block', color: 'text.secondary' }}
                        >
                          {date}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={disableSubmit}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={disableSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
          </>
  );
};

export default CompleteTasksDialog;
