'use client'

import React, { useState } from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, Box, TextField, Button, IconButton, Paper, Grid, OutlinedInput, InputLabel, Checkbox, InputAdornment} from '@mui/material';
import colors from '../ui/colors';
import Link from "next/link";
import { useRouter } from "next/navigation";


let registerSchema = Yup.object().shape({
    email: Yup.string().email('Please eneter valid email').required('Email is required'),
    username: Yup.string().min(4).max(50).required("Username is required"),
    password: Yup.string().min(6).required('Password is required'),
})

let initialValues = {
    email: '',
    username: '',
    password: '',
}


const LogInForm: React.FC = () => {

    const [passwordState, setPasswordState] = useState("show")
    const router = useRouter()

    const HandlePasswordState = () => {
        if(passwordState == "show"){
            setPasswordState("hide")
        }
        else{
            setPasswordState("show")
        }
    }



    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('/api/log-in', {
                    method: 'POST',
                    body: JSON.stringify(values)
                });
    
                if (response.ok) {
                    const { token } = await response.json();
                    document.cookie = `token=${token}; path=/`;
                    router.push("/scheduler");

                }
                else{
                    throw new Error('Log in failed');
                }
            } catch (error) {
                console.error('Error registering user:', error);
            }
        },
    })
    
    
    return(

        
        <Paper
        square={false}
        sx={{
            display: "flex",
            outline: 
            {
                lg: `2px solid ${colors.secondaryLightBlue}` ,
                sm: "none",
            },
            padding: "2em 5em 2em",
            flexDirection:"column",
            boxShadow: "none"
            // alignItems: "center",
            // justifyContent: "center",
        }}

        >
                <form onSubmit={formik.handleSubmit}>
                    <div 
                    style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column",}}
                    >
    
                        <h1  
                        style={{
                                marginTop: "1em",
                                display: "flex",
                                color: `${colors.primaryBlue}`
                        }}
                        >
                            Log in
                            <img src="\svg\login-person.svg"
                            alt="person SVG"
                            style={{
                                width: "40px",
                                height:  "40px",
                                marginLeft: "10px"
                            }}
                            />
                        </h1>
                        <TextField
                            label="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                                marginTop: "1em",
                             }}
                        />
                        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> :null}
                        <TextField
                            label="username"
                            name="username"
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                                marginTop: "1em",
                             }}
                            />
                        {formik.errors.username && formik.touched.username ? <div>{formik.errors.username}</div> :null}
                        <TextField
                            label="password"
                            name="password"
                            type={passwordState === 'show' ? 'password' : 'text'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                            style={{
                                marginTop: "1em",
                             }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={HandlePasswordState}>
                                            <img src={`/svg/eye-password-${passwordState}.svg`} alt={`${passwordState} password`} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> :null}

                    </div>
        
                    <div
                    style={{display: "flex", alignItems:"center", marginBottom:"2em"}}
                    >
                        <Checkbox/>
                        <div className="openSansRegular">
                            Remeber me
                        </div>
                       
                    </div>
        
                    <div>
                        Don t have account?
                        <Link
                        href="/register"
                        >
                            Register
                        </Link>
                    </div>
        
                    <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: `${colors.primaryBlue}`
                    }}
                    >
                        <div className="openSansSemiBold">
                            Log in
                        </div>
                       
        
                    </Button>
            </form>
            

        </Paper>
    )
}

export default LogInForm


