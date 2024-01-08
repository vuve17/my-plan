'use client'

import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Backdrop, Box, TextField, Button, IconButton, Paper, Grid, OutlinedInput, InputLabel, Checkbox, InputAdornment} from '@mui/material';
import colors from '../ui/colors';
import Link from "next/link";
import { useRouter } from "next/navigation";


let registerSchema = Yup.object().shape({
    email: Yup.string().email('Please eneter valid email').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),
})

let initialValues = {
    email: '',
    password: '',
}


const LogInForm: React.FC = () => {

    const [passwordState, setPasswordState] = useState("show")
    const [passwordError, setPasswordError] = useState("")
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
            const response = await fetch('/api/log-in', {
                method: 'POST',
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const { token } = await response.json();
                document.cookie = `token=${token}; path=/`;
                router.push("/scheduler");
            } else{
                const data = await response.json()
                setPasswordError(data.message)
            }
        },
    })
    
    
    return(

        <Box 
        sx={{
            width: "100vw", 
            height: "100vh - 71px",
            display: "flex", 
            alignItems: {
                md: "normal",
                sm: "center",
                xs: "center"
            },
            justifyContent: {
                md: "center",
                sm: "center",
                xs: "center"
            },
            paddingTop: "4em"
        }}
        >
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
            }

        }}

        >
                <form onSubmit={formik.handleSubmit}
                style={{marginBottom: "1em"}}
                >
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
                                minWidth: "267px",
                             }}
                        />
                        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> :null}
                        <TextField
                            label="password"
                            name="password"
                            type={passwordState === 'show' ? 'password' : 'text'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onClick={() => setPasswordError("")}
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
                        {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> :<div>{passwordError}</div>}

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
                            backgroundColor: `${colors.primaryBlue}`
                        }}
                        >
                            <div className="openSansSemiBold">
                                Log in
                            </div>
                        
            
                        </Button>
                    </div>


        

            </form>
            
            <div style={{marginTop: "1em"}}>
                Don t have account?
                <Link
                href="/register"
                >
                    Register
                </Link>
            </div>
        </Paper>
        </Box>
    )
}

export default LogInForm


