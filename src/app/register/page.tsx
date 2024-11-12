'use client'

import React, {useState} from "react";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, IconButton, Box, TextField, Button, Paper, InputAdornment, Grid, OutlinedInput, InputLabel, Checkbox} from '@mui/material';
import colors from '../ui/colors';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ErrorBox from "../components/authentication-error-messages-box";

export const dynamic = 'force-dynamic'

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
    const [disableButton, setDisableButtons] = useState<boolean>(false)

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
            setDisableButtons(true)
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(values)
                });
    
                if (!response.ok) {
                    console.log("Response OK");
                    console.log("Response error:", response.status, response.statusText);
                    const data = await response.json();
                    console.log("Error message:", data.message);
                    setEmailError(data.message);
                } else {
                    console.log("Response OK");
                    const { refreshToken, accessToken, message} = await response.json();
                    console.log(refreshToken, " ", accessToken)
                    console.log(message)
                    if (refreshToken && accessToken) {
                        document.cookie = `refreshToken=${refreshToken};  path=/`;
                        document.cookie = `accessToken=${accessToken}; path=/`;
                        router.push("/scheduler");
                    } else {
                        console.log("Else set pass error: Bad keys - frontend message");
                        setEmailError("Bad keys - frontend message");
                    }
                }
            } catch (error) {
                console.error('Error registering user:', error);
            } finally {
                setDisableButtons(false)
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
                lg: `2px solid ${colors.primaryBlue}` ,
                md: `2px solid ${colors.primaryBlue}` ,
                sm: "none",
            },
            padding:{
                lg: "2em 5em 2em",
                md: "2em 5em 2em",
                sm: "auto"
            },
            flexDirection:"column",
            boxShadow: "none",
            alignItems: "center",
            justifyContent: "center",
            width: {
                sm: "100vw",
                lg: "15em",
                md: "15em"
            },
            marginTop: "80px"
        }}

        >
                <form onSubmit={formik.handleSubmit} style={{marginBottom: "1em",
                }}>
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
                            <Image
                                src="\svg\register-person.svg"
                                alt="person SVG"
                                width={40}
                                height={40}
                                style={{
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
                                minWidth: "267px",
                             }}
                            onClick={() => setEmailError("")}
                        />
                        <TextField
                            label="username"
                            name="username"
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                                marginTop: "1em",
                                minWidth: "267px",
                             }}
                        />

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
                                minWidth: "267px",
                             }}
                             InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={HandlePasswordState}>
                                            <Image
                                             src={`/svg/eye-password-${passwordState}.svg`} 
                                             alt={`${passwordState} password`} 
                                             width={20}
                                             height={20}
                                             />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            label="confirm password"
                            name="passwordRepeat"
                            type={passwordRepeatState === "show" ? "password" : "text"}
                            value={formik.values.passwordRepeat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                            style={{
                                margin: "1em 0 1em 0",
                                minWidth: "267px",
                             }}
                             InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={HandlePasswordRepeatState}>
                                            <Image
                                                src={`/svg/eye-password-${passwordRepeatState}.svg`}
                                                alt={`${passwordRepeatState} password`} 
                                                width={20}
                                                height={20}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        
                        {formik.errors.email && formik.touched.email ? <ErrorBox text={formik.errors.email}/> : 
                            (
                                formik.errors.username && formik.touched.username ? <ErrorBox text={formik.errors.username}/> :
                                ( 
                                    formik.errors.password && formik.touched.password ? <ErrorBox text={formik.errors.password}/> :
                                    (
                                        formik.errors.passwordRepeat && formik.touched.passwordRepeat ? <ErrorBox text="Confirm password has to match password"/> : null
                                    )
                                )
                            )
                        }

                    </div>
        
                    <div
                    style={{display: "flex", alignItems:"center", marginBottom:"2em", marginTop: "1em"}}
                    >
                        <Checkbox/>
                        <div className="openSansRegular">
                            Remeber me
                        </div>
                       
                    </div>
                                
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: `${colors.primaryBlue}`,
                        }}
                        disabled={disableButton}
                        >
                            <div className="openSansSemiBold">
                                Register
                            </div>
                        </Button>
                    </div>
            </form>


            <div>
                Already have account? 
                <Link
                href="/login"
                style={{
                    marginLeft: "0.25em"
                }}
                >
                    Log in
                </Link>
            </div>
        </Paper>
    )
}

export default RegisterForm


