import React from "react";
import { Box, Card, CardActions, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import AchievementStars from "./achievement-stars";
import { Achievement } from "../lib/types";


const AchievementCard: React.FC<Achievement> = ({...props}) => {
    return(

                    <Card variant="outlined" 
                    sx={{
                        width: {
                            lg: "350px",
                            md: "320px",
                            sm: "280px",
                            xs: "200px"
                        },
                        padding: "0.5em",
                    }}
                    >
                        <CardContent 
            
                        >
                    	    <Box
                            sx={{
                                display: "flex",
                                position: "relative",
                                flexDirection: {
                                    lg: "row",
                                    md: "row",
                                    sm: "column",
                                    xs: "column"
                                },
                                
                            }}
                            >
                                <Box 
                                    sx={{
                                        display: "flex",
                                        position: "relative",
                                        flexDirection: "column",
                                        paddingRight: "1em",
                                        alignItems: "center"                         
                                    }}
                                >
            
                                    <Box               
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        height: {
                                            lg: "100px",
                                            md: "120px",
                                        },
                                        width:{
                                            lg:  "120px",
                                            md: "90px",
                                        },
                                        overflow: "hidden",
                                    }}
                                    >
                                        <CardMedia
                                        component="img"      
                                        sx={{
                                            objectFit: "cover",
                                            zIndex: "3", 
                                        }}
                                        image={`/svg/achievements/achievement-thumbnails/${props.image}`}
                                        alt={props.image}
                                        />
        
                                    </Box>
            
                                    <AchievementStars starCount={props.stars}/>
            
                                </Box>
        
                                    <Box>
                                        <Typography 
                                        fontFamily="Open Sans" 
                                        variant="h5"
                                        sx={{
                                            marginBottom: "0.5em",
                                        }}
                                        >
                                            {props.name}
                                        </Typography>
        
                                        <Typography fontFamily="Open Sans">
                                            {props.description}
                                        </Typography>
            
                                    </Box>
                                </Box>
                        </CardContent>
                    </Card>
    )
}

export default AchievementCard