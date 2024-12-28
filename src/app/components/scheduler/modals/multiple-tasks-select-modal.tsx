import { setTasks, setSelectedTask } from "@/app/redux/tasks-slice";
import type { Task, TaskString } from "@/app/lib/types";
import { Box, Paper, Backdrop, Stack, Typography, Divider } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setSelectedTasksMultiple } from "@/app/redux/tasks-slice";
import { setIsTaskModalMultipleActive } from "@/app/redux/task-modals-slice";
import { formatTime, formatDate } from "@/app/lib/user-tasks-functions";
import { convertSingleTaskToTaskString } from '../../../lib/user-tasks-functions';
import colors from "@/app/ui/colors";


const MultipleTasksModal: React.FC= () => {
  const dispatch = useDispatch();
  const tasks =  useSelector(
      (state: RootState) => state.tasks.selectedTasksMultiple
    );
  const backDropRef = useRef<HTMLDivElement>(null);
  const HandleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (backDropRef.current === event.target) {
      dispatch(setIsTaskModalMultipleActive(false));
    }
  };

  function handleSingleTaskModalOpen(task: TaskString) {
    dispatch(setSelectedTask(task))
    dispatch(setIsTaskModalMultipleActive(false));
  }
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Backdrop
        open={true}
        onClick={HandleBackdropClick}
        ref={backDropRef}
        sx={{ inert: "true" }}
      >
        <Paper
          square={false}
          elevation={3}
          sx={{
            position: "relative",
            width: {
              lg: "50vw",
              sm: "80vw",
              xs: "70vw",
            },
            maxWidth: "50rem",
            padding: "2em",
            zIndex: "10",
          }}
        >

          <Typography variant="h5" mb={2}>{tasks && tasks.length} simultanius tasks</Typography>

          {tasks && tasks.map((task) => {
            // console.log("task:", task)
            const startTime = formatDate(new Date(task.startDate));
            const endTime = formatDate(new Date(task.endDate));

            return (

                <Stack
                  sx={{ cursor: "pointer", borderBottom: `2px solid ${colors.lightGrey}`,     "&:hover": {
                    backgroundColor: colors.tasks.chore.TimeBackground,
                  },}}  
                  direction={"row"}
                  justifyContent={"space-between"}
                  pb={2}
                  pt={2}
                  pr={1}
                  pl={1}
                  key={task.id}
                  onClick={() => handleSingleTaskModalOpen(task)}
                >
                  <Stack width={'40%'}><Typography>{task.title}</Typography></Stack>
                  <Stack direction={"column"} key={task.id} justifyContent={"flex-end"}>
                    <Typography sx={{fontStyle: 'italic'}}>
                      {startTime} - {endTime}
                    </Typography>
                  </Stack>
                </Stack>
            );
          })}
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default MultipleTasksModal;
