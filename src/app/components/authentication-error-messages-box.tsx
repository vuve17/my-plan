'use client'

import React from "react";
import colors from "../ui/colors";
import { Box } from "@mui/material";

interface ErrorBoxProps {
    text: string
}

const ErrorBox : React.FC<ErrorBoxProps> = ({text}) => {
    return(
        <Box
        sx={{
            width: "100%",
            alignItems: "left",
            color: colors.error,
            fontSize: {
                sm: "14px",
            }
        }}
        >
            {text}
        </Box>
    )
}

export default ErrorBox