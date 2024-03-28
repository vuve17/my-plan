import React from 'react';
import { CardMedia } from '@mui/material';

interface arrowProps {
    height?: string | number
}

export const NextArrow:React.FC<arrowProps> = ({...props}) => {
    return(
        <CardMedia
            sx={{
                rotate: '-90deg',
            }}
            component="img"         
            image="/svg/next-arrow.svg" 
            alt="next arrrow" 
            height={props.height}
        />
    )
}

export const PreviousArrow:React.FC<arrowProps> = ({...props}) => {
    return(
        <CardMedia
        sx={{
            rotate: '-90deg',
        }}
        component="img"         
        image="/svg/previous-arrow.svg" 
        alt="previous arrrow" 
        height={props.height}
        />
        
    )
}