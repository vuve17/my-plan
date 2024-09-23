'use client'

import React, { useState, useEffect, useRef, } from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, Box, TextField, Button, Paper, Grid, OutlinedInput, InputLabel, Snackbar, IconButton } from '@mui/material';
import DatePickerInput from "../../calendar/input-date-picker";
import moment from "moment";
import Cookies from "js-cookie";
import { getTasks } from "../../../lib/user-tasks-functions";
import { Source_Serif_4 } from "next/font/google";
import Bookmark from "../scheduler_utils/bookmark";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../../redux/store';
import { Task } from "../../../lib/types";
import { setIsSnackBarOpen, setSnackBarText, setSnackbarAlertState } from "../../../redux/snackbar-slice";
import { setIsTaskModalActive, setTaskModalDate } from '@/app/redux/create-taks-modal-slice';
import { setTasks } from "@/app/redux/tasks-slice";

export const dynamic = 'force-dynamic'

// const timeType = /^([01][0-9]|2[0-3]):[0-5][0-9]$/


function TimeHours(time: string) { 
    return Number(time.slice(0,2))
}

function TimeMinutes(time: string) {
    const minutes = Number(time.slice(3, 5))
    return minutes
}

function setDateTime (date: Date, time: string) {
    const newDate = new Date(date)
    newDate.setHours(TimeHours(time)+1)
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
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required").when('startDate', (startDate, schema) => {
        return schema.test({
            name: 'is-after-start-date',
            exclusive: false,
            message: 'End Date must be after Start Date',
            test: function(endDate) {
                const start = Array.isArray(startDate) ? startDate[0] : startDate;              
                if (!start || !endDate) {
                    return true;
                }
                return new Date(endDate) > new Date(start);
            },
        });
    }),

    startTime: Yup
    .string()
    .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
    .required("Start time is required"),
    // .test("is-earlier", "Start time should be earlier than end time", function(value) {
    //   const { endTime } = this.parent;
    //   return moment(value, "HH:mm").isSameOrBefore(moment(endTime, "HH:mm"));
    // }),
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
    description: Yup.string().max(255).min(0),
    taskType: Yup.string().required().oneOf(['chore', 'event']).strict(true),

})


const createStartPropsTime = (time: number | undefined) => {
    
    if(time)
    {
        return time.toString().padStart(2, '0') + ":00";
    } else if (time == 0){
        return "00:00"
    } else {
        return undefined
    }
}

const createEndPropsTime = (time: number | undefined, endDate?: Date) => {
    if(time)
    {
        if(time === 23)
        {
            return "00:00"
        }
        time ++
        return time.toString().padStart(2, '0') + ":00";
    } else if (time == 0){
        return "01:00"
    } else {
        return undefined
    }
}

const currentDate = new Date();
const startHours = currentDate.getHours();
const endHours = startHours + 1;
const currentStartTime = startHours.toString().padStart(2, '0') + ":00";
const currentEndTime = endHours.toString().padStart(2, '0') + ":00";

const CreateTaskModal: React.FC = () => {

    // const [twelvePmNewDay, setTwelvePmNewDay] = useState<Boolean>(false)
    const backDropRef = useRef<HTMLDivElement>(null)
    
    const isSnackBarOpen = useSelector((state : RootState) => state.snackbar.isSnackBarOpen)
    const snackbarText = useSelector((state : RootState) => state.snackbar.snackbarText)
    const snackbarAlertState = useSelector((state : RootState) => state.snackbar.snackbarAlertState)
    const dispatch = useDispatch()
    const taskModalDateString = useSelector((state : RootState) => state.createTaskModal.taskModalDate)
    const taskModalDate = new Date(taskModalDateString)

    const propsStartHours = taskModalDate?.getHours()
    const startTime = createStartPropsTime(propsStartHours)
    const endTime =  createEndPropsTime(propsStartHours)
    const bookmarkType = useSelector((state: RootState) => state.bookmark.type);
    const initialStartDate = taskModalDate || new Date();
    const initialStartTime = moment(initialStartDate).format('HH:mm');
    const initialEndDate = new Date(initialStartDate);
    initialEndDate.setHours(initialStartDate.getHours() + 1);
    const initialEndTime = moment(initialEndDate).format('HH:mm');  
    
    const handleSnackbarClose = () => {
        dispatch(setIsSnackBarOpen(false))
    }

    const handleTaskModalClose = () => {
        dispatch(setIsTaskModalActive(false))
    }

     const formik = useFormik({
        initialValues : {
            title: "",
            startDate: initialStartDate ,
            startTime: initialStartTime ,
            endDate: initialEndDate,
            endTime: initialEndTime,
            description: "",
            taskType: bookmarkType
        },
        // provjeriti kako se bookmark sprema u bazu (je li boolean ili string)
                        // vrijeme u bazi je još dalje jedno manje nego kako bi trebalo biti
                // console.log(sentData.startDate.toISOString())
                // console.log(sentData.startDate.toISOString().replace("T", " "))
        validationSchema: newTaskSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const { 
                    startTime, 
                    endTime,
                    ...sentData 
                } = values;

                sentData.startDate = setDateTime(sentData.startDate, startTime)
                sentData.endDate = setDateTime(sentData.endDate, endTime)
                sentData.taskType = bookmarkType

                const token = Cookies.get("refreshToken");

                const response = await fetch('/api/create-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify({
                        description: sentData.description,
                        title: sentData.title,
                        // startDate: sentData.startDate.toISOString().replace("T", " "),
                        // endDate: sentData.endDate.toISOString().replace("T", " "),
                        startDate: sentData.startDate.toISOString(),
                        endDate: sentData.endDate.toISOString(),
                        taskType: sentData.taskType
                    })
                });

                if (response.ok) {
                    dispatch(setSnackBarText(`Successfuly created ${sentData.title} ${sentData.taskType}`))
                    dispatch(setSnackbarAlertState("success"))
                    dispatch(setIsSnackBarOpen(true))

                    dispatch(setIsTaskModalActive(false))
                    console.log("created");
                    const tasks = await getTasks()
                    if(tasks)
                    {
                        dispatch(setTasks(tasks))
                        // console.log(tasks);
                    }
                } 
                else {
                    dispatch(setSnackBarText("Failed to create task"))
                    dispatch(setSnackbarAlertState("error"))
                    dispatch(setIsSnackBarOpen(true))
                    console.log("creation failed")
                }
            }
            catch (error) {
                dispatch(setSnackBarText("Failed to create task"))
                dispatch(setSnackbarAlertState("error"))
                dispatch(setIsSnackBarOpen(true))
                console.log("creation failed")
                console.error('Error creating task:', error);
            }
        }
    })

    const HandleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (backDropRef.current === event.target) {
            dispatch(setIsTaskModalActive(false))
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
                             {formik.errors.title && formik.touched.title ? <div>{formik.errors.title}</div> :null}

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
                                                    onChange={(date) => {formik.setFieldValue('startDate', date); formik.handleChange}}

                                                     />
                                                    {formik.errors.startDate && formik.touched.startDate ? <div>{String(formik.errors.startDate)}</div> : null}
                                                    
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
                                                    onChange={formik.handleChange}
                                                    />
                                                </Grid>
                                                {/* {formik.errors.startTime && formik.touched.startTime ? <div>{formik.errors.startTime}</div> :null} */}

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
                                                    {formik.errors.endDate && formik.touched.endDate ? <div>{String(formik.errors.endDate)}</div> : null}

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
                                                    onChange={formik.handleChange}
                                                    />

                                                    {formik.errors.endTime && formik.touched.endTime ? <div>{formik.errors.endTime}</div> :null}

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
                                        // label="Description"
                                        fullWidth
                                        value={formik.values.description}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />

                                    {formik.errors.description && formik.touched.description ? <div>Description must be under 255 characters</div> : null}          
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
                                    sx={{backgroundColor: "red", marginRight: "1em"}}
                                    name="cancleBtn"
                                    color="error"
                                    onClick={handleTaskModalClose}
                            
                                >
                                    Cancel
                                </Button>
                                <Button variant="contained" name="saveBtn" type="submit" >
                                    Save
                                </Button>
                            </Grid >
    
                        </Grid>
                    </form>
                </Paper>
            </Backdrop>
        </Box>
    )
}

export default CreateTaskModal


// const [bookmarkValue, setBookmarkValue] = useState<boolean | null>(null);
// const choreBookmarkRef = useRef<HTMLDivElement>(null);
// const eventBookmarkRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//     if (bookmarkValue === true) {
//         animateBookmark(choreBookmarkRef.current, 100); 
//         animateBookmark(eventBookmarkRef.current, 150); 
//     } else if (bookmarkValue === false) {
//         animateBookmark(eventBookmarkRef.current, 100); 
//         animateBookmark(choreBookmarkRef.current, 150); 
//     } else {
//         animateBookmark(choreBookmarkRef.current, 100); 
//         animateBookmark(eventBookmarkRef.current, 100);
//     }

// }, [bookmarkValue]);


// const animateBookmark = (element: HTMLElement | null, finalHeight: number) => {
//     if (element) {
//         const initialHeight = element.clientHeight;
//         if (initialHeight !== finalHeight) {
//             let currentHeight = initialHeight;
//             const interval = setInterval(() => {
//                 if (currentHeight < finalHeight && finalHeight > initialHeight) {
//                     currentHeight += 1;
//                 } else if (currentHeight > finalHeight && finalHeight < initialHeight) {
//                     currentHeight -= 1;
//                 } else {
//                     clearInterval(interval);
//                 }
//                 element.style.height = currentHeight + "px";
//             }, 10);
//         }
//     }
// };

// const handleBookmarkClick = ( newValue: boolean | null) => {
//     setBookmarkValue(newValue);
//     formik.setFieldValue('taskType', newValue)
// };
