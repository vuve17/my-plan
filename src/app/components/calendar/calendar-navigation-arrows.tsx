import React from 'react';
import { CardMedia } from '@mui/material';


export const NextArrow = () => {
    return(
        <CardMedia
        component="img"         
        image="/svg/next-arrow.svg" 
        alt="next arrrow" />
    )
}

export const PreviousArrow = () => {
    return(
        <CardMedia
        component="img"         
        image="/svg/previous-arrow.svg" 
        alt="previous arrrow" />
    )
}