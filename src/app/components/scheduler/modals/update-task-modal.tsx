'use client'

import React, { useState, useEffect, useRef, ChangeEvent, } from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, Box, TextField, Button, Paper, Grid, OutlinedInput, InputLabel, Snackbar, IconButton } from '@mui/material';
import DatePickerInput from "../../calendar/input-date-picker";
import moment from "moment";
import Cookies from "js-cookie";
import { getTasks } from "@/app/lib/user-tasks-functions";
import { Source_Serif_4 } from "next/font/google";
import Bookmark from "../scheduler_utils/bookmark";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Task, apiDeletedTask } from "@/app/lib/types";
import { setIsSnackBarOpen, setSnackBarText, setSnackbarAlertState } from "@/app/redux/snackbar-slice";
import { setIsTaskModalActive, setTaskModalDate } from '@/app/redux/task-modals-slice';
import { setTasks, setSelectedTask, resetStates } from '@/app/redux/tasks-slice';
import { convertTaskStringToTaskValuePair, convertTaskStringToTask } from "@/app/lib/user-tasks-functions";
import { setBookmarkValue } from "@/app/redux/bookmark-slice";
import ErrorBox from "../../authentication-error-messages-box";


export const dynamic = 'force-dynamic'

function TimeHours(time: string) {
    return Number(time.slice(0,2))
}

function TimeMinutes(time: string) {
    const minutes = Number(time.slice(3, 5))
    return minutes
}

function setDateTime (date: Date, time: string) {
    const newDate = new Date(date)
    newDate.setHours(TimeHours(time))
    newDate.setMinutes(TimeMinutes(time))
    return newDate
}

function createStartTime(time: string | undefined) {
    if(time)
    {
        const formattedTime = time.length === 1 ? `0${time}:00` : `${time}:00`;;
        return formattedTime
    }
    return undefined
    
}

function createEndTime(time: string | undefined) {
    if(time){
        const incrementTime = Number(time) + 1;
        const endTime = createStartTime(incrementTime.toString())
        return endTime
    }
    return undefined
}

const SourceSerif4 = Source_Serif_4({
    weight: "700",
    subsets: ['latin'],
});


let newTaskSchema = Yup.object().shape({
    title: Yup.string().max(50).min(1).required("Title is required"),
    startDate: Yup.date()
        .required("Start Date is required")
        .test({
          name: 'is-after-current-date',
          exclusive: false,
          message: 'Start Date must be the same as or after the current date and time',
          test: function(startDate) {
            if (!startDate) {
              return true;
            }
            const now = new Date();
            console.log("now: ", now, "true false? ", new Date(startDate) >= now) 
            console.log("startDate: ", new Date(startDate))
            return new Date(startDate) >= now;
          },
        }),
    endDate: Yup.date()
    .required("End Date is required")
    .when('startDate', (startDate, schema) => {
        return schema.test({
            name: 'is-after-start-date',
            exclusive: false,
            message: 'End Date must be the same or after Start Date',
            test: function(endDate) {
                const start = Array.isArray(startDate) ? startDate[0] : startDate;
                if (!start || !endDate) {
                    return true;
                }
                return moment(endDate).isSameOrAfter(moment(start), 'day');
            },
        });
    }),

    startTime: Yup
    .string()
    .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
    .required("Start time is required"),
    endTime: Yup
    .string()
    .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
    .required("End time cannot be empty")
    .test("is-greater", "End time should be greater than start time", function(value) {
        const { startDate, endDate, startTime } = this.parent;
        if (startDate && endDate && new Date(startDate).toDateString() === new Date(endDate).toDateString()) {
            return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
        }
        return true;
    }),
    descripton: Yup.string().max(255).min(0),
    taskType: Yup.string().required().oneOf(['chore', 'event']).strict(true),

})


const createStartPropsTime = (startDate : Date) => {
    if(startDate)
    {
        const hours : number = new Date(startDate).getHours()
        const minutes : number = new Date(startDate).getMinutes()

        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    }
}

const createEndPropsTime = (endDate : Date) => {
    if(endDate)
    {
        const hours : number = new Date(endDate).getHours()
        const minutes : number = new Date(endDate).getMinutes()

        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    }
}

const currentDate = new Date();
const startHours = currentDate.getHours();
const endHours = startHours + 1;


interface UpdateTaskModalProps {
    task: Task
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({task}) => {

        const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            formik.setFieldValue('startDate', applyTimeToDate(formik.values.startDate, e.target.value));
          };
        
          const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            formik.setFieldValue('endDate', applyTimeToDate(formik.values.endDate, e.target.value));
          };
      
        const applyTimeToDate = (date: Date, time: string): Date => {
            const [hours, minutes] = time.split(':').map(Number);
            const updatedDate = new Date(date);
            updatedDate.setHours(hours);
            updatedDate.setMinutes(minutes);
            console.log("updatedDate: ", updatedDate)
            return updatedDate;
          };

    // zanijeniti sve sa taskom 
    // const [twelvePmNewDay, setTwelvePmNewDay] = useState<Boolean>(false)
    const backDropRef = useRef<HTMLDivElement>(null)
    
    const dispatch = useDispatch()
    const taskModalDateString = useSelector((state : RootState) => state.createTaskModal.taskModalDate)
    const taskModalDate = new Date(taskModalDateString)

    const startTime = createStartPropsTime(task.startDate)
    const endTime =  createEndPropsTime(task.endDate)
    const bookmarkType = useSelector((state: RootState) => state.bookmark.type);
    
    const initialStartDate = taskModalDate || new Date();
    const initialStartTime = moment(initialStartDate).format('HH:mm');
    const initialEndDate = new Date(initialStartDate);
    initialEndDate.setHours(initialStartDate.getHours() + 1);
    const initialEndTime = moment(initialEndDate).format('HH:mm');  
    const initialBookmarkState = useSelector((state: RootState) => state.bookmark.type)
    const [disableButton, setDisableButtons] = useState<boolean>(false)


    const selectedTaskString = useSelector((state: RootState) => state.tasks.selectedTask)
    
    const handleUpdateTaskModalClose = () => {
        setDisableButtons(true)
        dispatch(setSelectedTask(null))
        dispatch(setIsTaskModalActive(false))
    }
    
    const handleTaskDelete = async () => {
        try {
            setDisableButtons(true)
            const token = Cookies.get("refreshToken");
    
            const response = await fetch(`/api/delete-task/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const body: apiDeletedTask = await response.json(); 
                setSnackBarText(`Successfully deleted ${body.title}`);
                setSnackbarAlertState("success");    
                setIsSnackBarOpen(true);
                const fetchAllTasks = await getTasks();
                if(fetchAllTasks){
                    dispatch(setTasks(fetchAllTasks));
                    handleUpdateTaskModalClose()
                }
            } else {
                setSnackBarText("Failed to delete the task");
                setSnackbarAlertState("error");
                setIsSnackBarOpen(true);
            }
        } catch (error) {
            console.log(error);
            setIsSnackBarOpen(true);
            setSnackBarText("Error deleting task");
            setSnackbarAlertState("error");
        }
    };
    
     const formik = useFormik({
        initialValues : {
            title: task ? task.title :  "",
            startDate: task ? task.startDate : initialStartDate ,
            startTime: task ? createStartPropsTime(task.startDate) : initialStartTime ,
            endDate:  task ? task?.endDate : initialEndDate,
            endTime: task ? createEndPropsTime(task.endDate) : initialEndTime,
            description: task ? task?.description : "",
            taskType: task ? task.taskType :  initialBookmarkState
        },
        validationSchema: newTaskSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                setDisableButtons(true)
                const { 
                    startTime, 
                    endTime,
                    ...sentData 
                } = values;

                const finalStartTime = startTime || "00:00";
                const finalEndTime = endTime || "00:00";

                sentData.startDate = setDateTime(sentData.startDate, finalStartTime)
                sentData.endDate = setDateTime(sentData.endDate, finalEndTime)
                sentData.taskType = bookmarkType

                const token = Cookies.get("refreshToken");

                const response = await fetch(`/api/update-task/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify({
                        description: sentData.description,
                        title: sentData.title,
                        startDate: sentData.startDate.toISOString(),
                        endDate: sentData.endDate.toISOString(),
                        taskType: sentData.taskType
                    })
                });
                const responseData = await response.json()
                if (response.ok) {
                    dispatch(resetStates())
                    dispatch(setSnackBarText(`Successfuly created ${sentData.title} ${sentData.taskType}`))
                    dispatch(setSnackbarAlertState("success"))
                    dispatch(setIsSnackBarOpen(true))

                    handleUpdateTaskModalClose()
                    console.log("updated");
                    const tasks = await getTasks()
                    if(tasks)
                    {
                        dispatch(setTasks(tasks))
                        console.log("tasks: ",tasks);
                    }
                    
                } 
                else {
                    dispatch(setSnackBarText("Failed to create task"))
                    dispatch(setSnackbarAlertState("error"))
                    dispatch(setIsSnackBarOpen(true))
                    console.log("creation failed")
                    console.log(responseData);
                    
                }
            }
            catch (error) {
                
                dispatch(setSnackBarText("Failed to create task"))
                dispatch(setSnackbarAlertState("error"))
                dispatch(setIsSnackBarOpen(true))
                console.log("creation failed")
                console.error('Error creating task:', error);
            } finally {
                setDisableButtons(true)
            }
        }
    })

    const HandleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (backDropRef.current === event.target) {
            handleUpdateTaskModalClose()
        }
    }


    useEffect(() => {
        if (formik.values.endTime === "00:00") {
            const newEndDate = new Date(formik.values.startDate);
            newEndDate.setDate(newEndDate.getDate() + 1);
            formik.setFieldValue("endDate", newEndDate);
            // setTwelvePmNewDay(true);
        } else {
            // setTwelvePmNewDay(false);
        }
    }, [formik.values.endTime]);

    useEffect(() => {
        dispatch(setBookmarkValue(task.taskType))
    })
 
    return(
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
        >

            <Backdrop 
                open={true} 
                onClick={HandleBackdropClick} 
                ref={backDropRef} 
                sx={{inert: "true"}}
            >

                <Paper
                    square={false}
                    elevation={3}
                    sx={{
                        position: "relative",
                        width:
                        {
                            lg: "50vw",
                            sm: "80vw",
                            xs: "70vw",
                        },
                        maxWidth: "50rem",
                        padding: "2em",
                        zIndex: "10",
                    }}      
                >
                    <form onSubmit={formik.handleSubmit} autoComplete="off" >

                        <Grid container spacing={4} 
                        sx={{
                            position: "relative",
                        }}
                        >

                                <Bookmark 
                                />
                                 
                            <Grid item  xl={8} lg={8} md={8} sm={12} xs={12}
                            >
                                <TextField 
                                    value={formik.values.title}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Title" 
                                    name="title" 
                                    variant="standard" 
                                    sx={{
                                        width: {
                                        xs: "100%",
                                        sm: "70%",
                                        lg: "70%",
                                        xl: "70%",
    
                                    },
                                    
                                }}
                                />

                            </Grid >
    
    
                                <Grid item lg={12}>
                                    <Grid container spacing={2}>
                                        <Grid
                                        item
                                        lg={6}
                                        sm={6}
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between"
                                        }}
                                        >
                                            <Grid 
                                                container 
                                                spacing={2}
                                            >
                                                <Grid 
                                                item
                                                lg={12}
                                                sm={12}
                                                xs={12}
                                                >
                                                    <div style={{ width: "100px"}}>
                                                        Start Date
                                                    </div>
                                                </Grid>
                                                <Grid item
                                                lg={12}
                                                sm={12}
                                                xs={12}
                                                >
                                                    <DatePickerInput 
                                                    name="datePickerInputStartDate"
                                                    value={formik.values.startDate}
                                                    onChange={(date: Date) => {formik.setFieldValue('startDate', date); formik.handleChange}}

                                                     />
                                                    
                                                </Grid>
                                                
                                                <Grid item
                                                lg={12}
                                                sm={12}
                                                xs={12}
                                                >
                                                    <input 
                                                    type="time" 
                                                    name="startTime" 
                                                    value={formik.values.startTime} 
                                                    onBlur={formik.handleBlur}
                                                    // onChange={formik.handleChange}
                                                    onChange={handleStartTimeChange}
                                                    />
                                                </Grid>

                                            </Grid>
                                        </Grid >
    
                                        <Grid
                                            item
                                            lg={6}
                                            sm={6}
                                            xs={6}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Grid 
                                                container 
                                                spacing={2}
                                            >
                                                <Grid item 
                                                lg={12}
                                                sm={12}
                                                xs={12} 
                                                >
                                                    <div style={{ width: "100px"}}>End Date</div>
                                                </Grid>
                                                <Grid item
                                                lg={12}
                                                sm={12}
                                                xs={12} 
                                                >
                                                    <DatePickerInput
                                                    name="datePickerInputEndDate" 
                                                    value={formik.values.endDate}
                                                    onChange={(date) => {formik.setFieldValue('endDate', date); formik.handleChange}}
                                                    twelvePmTime = {endTime === "00:00" ? true : false}
                                                    />

                                                </Grid>
                                                <Grid item
                                                lg={12}
                                                sm={12}
                                                xs={12}
                                                >
                                                    <input 
                                                    type="time" 
                                                    name="endTime"
                                                    value={formik.values.endTime}
                                                    onBlur={formik.handleBlur}
                                                    // onChange={formik.handleChange}
                                                    onChange={handleEndTimeChange}
                                                    />

                                                </Grid>
                                            </Grid>
                                        </Grid >
    
                                    </Grid>
                                </Grid>
    
                                <Grid 
                                    item
                                    lg={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <InputLabel htmlFor="description">Description</InputLabel>
                                    <OutlinedInput
                                        id="description"
                                        name="description"
                                        fullWidth
                                        value={formik.values.description}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />          
                                </Grid>   
                                          
                                
    
                            <Grid  
                                item
                                style={{display: "flex", flexDirection: "row",}}
                                // lg={9}
                                md={8}
                                sm={7}
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >

                            {
                                formik.errors.startDate && formik.touched.startDate ? <ErrorBox text="Start Date must be the same as or after the current date and time"/> : 
                                (formik.errors.endDate && formik.touched.endDate ? <ErrorBox text="End Date must be the same or after Start Date"/> : 
                                    (
                                    formik.errors.endTime && formik.touched.endTime ? <ErrorBox text={formik.errors.endTime}/> : 
                                        (
                                            formik.errors.title && formik.touched.title ? <ErrorBox text={formik.errors.title}/> : 
                                            (
                                                formik.errors.description && formik.touched.description ? <ErrorBox text={formik.errors.description}/> : null
                                            )
                                        )
                                    )
                                )   
                            }

                            </Grid >
                            
                            <Grid  
                                item
                                style={{display: "flex", flexDirection: "row",}}
                                // lg={3}
                                md={4}
                                sm={5}
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                    {
                                        md: "space-evenly",
                                        xs: "flex-end",
                                    },
                                }}
                            >
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        backgroundColor: "red",
                                        marginRight: "1em",
                                        fontWeight: "bold"
                                    }}
                                    name="cancleBtn"
                                    color="error"
                                    onClick={handleTaskDelete}
                                    disabled={disableButton}
                                >
                                    Delete
                                </Button>
                                <Button 
                                    variant="contained" 
                                    sx={{backgroundColor: "red", marginRight: "1em", fontWeight: "bold"}}
                                    name="cancleBtn"
                                    color="error"
                                    onClick={handleUpdateTaskModalClose}
                                    disabled={disableButton}
                            
                                >
                                    Cancel
                                </Button>
                                <Button 
                                variant="contained"
                                name="saveBtn"
                                type="submit"
                                sx={{
                                    fontWeight: "bold"
                                }}
                                disabled={disableButton}
                                 >
                                    Update
                                </Button>
                            </Grid >
    
                        </Grid>
                    </form>
                </Paper>
            </Backdrop>
        </Box>
    )
}

export default UpdateTaskModal