'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo, memo } from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, Box, TextField, Button, Paper, Grid, OutlinedInput, InputLabel} from '@mui/material';
import DatePickerInput from "./input-date-picker";
import moment from "moment";
import Cookies from "js-cookie";
import getTasks from "../lib/fetch-user-tasks";

export const dynamic = 'force-dynamic'

interface CreateTaskModalProps {
    cancel: () => void,
    date?: Date,
    time?: string,
}

function createTime(time: string | undefined) {
    if(time)
    {
        const formattedTime = time.length === 1 ? `0${time}:00` : `${time}:00`;;
        return formattedTime

    }
    else{
        return undefined
    }
}

function createEndTime(time: string | undefined) {
    if(time){
        const incrementTime = Number(time) + 1;
        const endTime = createTime(incrementTime.toString())
        return endTime
    }
    else{
        return undefined
    }

}

let newTaskSchema = Yup.object().shape({
    title: Yup.string().max(50).min(1).required("Title is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required").when('startDate', (startDate, schema) => {
        return startDate && schema.min(startDate)
    }),

    startTime: Yup
    .string()
    .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
    .required("Start time is required")
    .test("is-earlier", "Start time should be earlier than end time", function(value) {
      const { endTime } = this.parent;
      return moment(value, "HH:mm").isSameOrBefore(moment(endTime, "HH:mm"));
    }),
    endTime: Yup
    .string()
    .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
    .required("end time cannot be empty")
    .test("is-greater", "End time should be greater than start time", function(value) {
      const { startTime } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
    }),

    descripton: Yup.string().max(255).min(0),

    // taskType: Yup.string().required().oneOf(['chore', 'task']).strict(true),
    // event: Yup.boolean().required(),
    // chore: Yup.boolean().required(),
})

const currentDate = new Date();
const startHours = currentDate.getHours();
const endHours = startHours + 1;
const currentStartTime = startHours.toString().padStart(2, '0') + ":00";
const currentEndTime = endHours.toString().padStart(2, '0') + ":00";

const CreateTaskModal: React.FC <CreateTaskModalProps> = ({...props}) => {
    
    const backDropRef = useRef<HTMLDivElement>(null)
    const startTime = createTime(props.time)
    const endTime =  createEndTime(props.time)
    const formik = useFormik({
        initialValues : {
            title: "",
            startDate: props.date || currentDate,
            startTime: startTime || currentStartTime ,
            endDate: props.date ||  currentDate,
            endTime: endTime || currentEndTime,
            description: "",
        },
        validationSchema: newTaskSchema,
        onSubmit: async (values) => {
            const token = Cookies.get("token")
            const response = await fetch('/api/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(values)
            });
            if(response.ok){
                props.cancel();
                console.log(getTasks())
                console.log("created")
            }
        }
    })



    const HandleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (backDropRef.current === event.target) {
            props.cancel();
        }
    }

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
            <Backdrop open={true} onClick={HandleBackdropClick} ref={backDropRef}
            >
                <Paper
                    square={false}
                    elevation={3}
                    sx={{
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
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <Grid container spacing={4}>
    
                            <Grid item lg={12} sm={12} xs={12}>
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
                                        xl: "50rem",
    
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
                                                    <input type="time" 
                                                    name="startTime" 
                                                    value={formik.values.startTime} 
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    />
                                                </Grid>
                                                {formik.errors.startTime && formik.touched.startTime ? <div>{formik.errors.startTime}</div> :null}

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
                                                    />
                                                    {formik.errors.endDate && formik.touched.endDate ? <div>{String(formik.errors.endDate)}</div> : null}

                                                </Grid>
                                                <Grid item
                                                lg={12}
                                                sm={12}
                                                xs={12}
                                                >
                                                    <input type="time" 
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
                                <Button variant="text" name="advancedSettingBtn">
                                    Advanced Settings
                                </Button>
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
                                    onClick={props.cancel}
                                >
                                    Cancel
                                </Button>
                                <Button variant="contained" name="saveBtn" type="submit">
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



