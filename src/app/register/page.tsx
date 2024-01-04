'use client'

import React, {useState} from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, IconButton, Box, TextField, Button, Paper, InputAdornment, Grid, OutlinedInput, InputLabel, Checkbox} from '@mui/material';
import colors from '../ui/colors';
import Link from "next/link";
import { useRouter } from "next/navigation";


let registerSchema = Yup.object().shape({
    email: Yup.string().email('Please eneter valid email').required('Email is required'),
    username: Yup.string().min(4).max(50).required("Username is required"),
    password: Yup.string().min(6).required('Password is required'),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password')]).required('Please confirm password'),
})

let initialValues = {
    email: '',
    username: '',
    password: '',
    passwordRepeat: ''
}



const RegisterForm: React.FC = () => {

    const [passwordState, setPasswordState] = useState("show")
    const [passwordRepeatState, setpasswordRepeatState] = useState("show")
    const [emailError, setEmailError] = useState("")
    const router = useRouter()
    const HandlePasswordState = () => {
        if(passwordState == "show"){
            setPasswordState("hide")
        }
        else{
            setPasswordState("show")
        }
    }

    const HandlePasswordRepeatState = () => {
        if(passwordRepeatState == "show"){
            setpasswordRepeatState("hide")
        }
        else{
            setpasswordRepeatState("show")
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(values)
                });
    
                if (response.ok) {
                    const { token } = await response.json();
                    document.cookie = `token=${token}; path=/`;
                    router.push("/scheduler");
                }
                else{
                    console.log(values)
                    if(response.status === 409)
                    {
                        const data = await response.json(); // Parse response body as JSON
                        const errorMessage = data.message;
                        setEmailError(errorMessage)
                    }
                    throw new Error('Failed to register');
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
                            Register
                            <img src="\svg\register-person.svg"
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
                            onClick={() => setEmailError("")}
                        />
                        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> :<div>{emailError}</div>}
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
                        {formik.errors.username && formik.touched.username ? <div>{formik.errors.username}</div> : null}
                        <TextField
                            label="password"
                            name="password"
                            type={passwordState === "show" ? "password" : "text"}
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

                        <TextField
                            label="confirm password"
                            name="passwordRepeat"
                            type={passwordRepeatState === "show" ? "password" : "text"}
                            value={formik.values.passwordRepeat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                            style={{
                                marginTop: "0.5em",
                             }}
                             InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={HandlePasswordRepeatState}>
                                            <img src={`/svg/eye-password-${passwordRepeatState}.svg`} alt={`${passwordRepeatState} password`} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {formik.errors.passwordRepeat && formik.touched.passwordRepeat ? <div>confirm password has to match password</div> :null}
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
                        Already have account?
                        <Link
                        href="/login"
                        >
                            Log in
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
                            Register
                        </div>
                       
        
                    </Button>
            </form>
            

        </Paper>
    )
}

export default RegisterForm


