import React from 'react';
import { CardMedia } from '@mui/material';


export const NextArrow = () => {
    return(
        <CardMedia
        component="img"         
        image="/svg/next-arrow.svg" 
        alt="next arrrow" 
        width={20}
        />
    )
}

export const PreviousArrow = () => {
    return(
        <CardMedia
        component="img"         
        image="/svg/previous-arrow.svg" 
        alt="previous arrrow" 
        width={20}
        />
    )
}