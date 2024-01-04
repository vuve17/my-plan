'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo, memo } from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, Box, TextField, Button, Paper, Grid, OutlinedInput, InputLabel} from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerInput from "./input-date-picker";

interface CreateTaskModalProps {
    cancel: () => void,
}

let newTaskSchema = Yup.object().shape({
    title: Yup.string().max(50).min(1).default("Title").required("Title is required"),
    // startDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/).required(),
    
    startDate: Yup.date().required(),
    startTime: Yup.string().matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/).required(),


    // endDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/).required().when('startDate', (startDate, schema) => {
    //     return startDate && schema.min(startDate, 'End date must be later than or equal to start date');
    //   }),
    endDate: Yup.date().required().when('startDate', (startDate, schema) => {
        return startDate && schema.min(startDate)
    }),
    endTime: Yup.string().matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/).required(),
    descripton: Yup.string().max(255).min(0),
    // event: Yup.boolean().required(),
    // chore: Yup.boolean().required(),
    taskType: Yup.string().required().oneOf(['chore', 'task']).strict(true),

})






const initialValues = {
    title: "",
    startDate: "Thu Dec 07 2023 00:00:00 GMT+0100 (srednjoeuropsko standardno vrijeme)",
    startTime: "08:00",
    endDate: "Thu Dec 07 2023 00:00:00 GMT+0100 (srednjoeuropsko standardno vrijeme)",
    endTime: "09:00",
    description: "",
    test: ""
}

const onSubmit = () => {
    console.log("submited");
}

const CreateTaskModal: React.FC <CreateTaskModalProps> = ({...props}) => {

    const backDropRef = useRef<HTMLDivElement>(null)
    const formik = useFormik({
        initialValues : initialValues,
        // validationSchema: newTaskSchema,
        onSubmit,
    })

    const HandleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (backDropRef.current === event.target) {
            props.cancel();
            console.log(event.target)
        }
    }
    // console.log(formik.values)

    return(
        <Box
            width="100vw" 
            height="100vh"
            
            sx={{
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
                                                    onChange={(date) => formik.setFieldValue('startDate', date)} 
                                                    
                                                     />
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
                                                    value={new Date(formik.values.endDate)}
                                                    onChange={(date) => formik.setFieldValue('endDate', date)}
                                                    />
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



