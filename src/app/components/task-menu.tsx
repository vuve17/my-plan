import React, { useState } from 'react';
import { Button, Box, Grid} from '@mui/material';
import colors from '../ui/colors'
import CreateTaskModal from './create-task-modal';
import Image from 'next/image';

const customGridItemStyle = {
    display: "flex",
    paddingTop: {
        xs: "14px",
        sm: "14px",
        lg: "10px",
    },
    paddingBottom: {
        xs: "14px",
        sm: "14px",
        lg: "10px",
    },
    padding: "auto",
    justifyContent: "space-evenly",
    alignItems: "center",
};

const smallDeviceStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
}

const customButtonStyle = {
    backgroundColor: "white",
    padding: "10px 0 10px 0",
    width: "60px",
    height: "60px",
    margin: "0",
    "&:hover": {
        backgroundColor: "white",
        "& img": {
            transform: "scale(1.1)", 
        },
    }
};

interface TaskMenuProps {
    device: boolean
}

const TaskMenu:React.FC<TaskMenuProps> = ({...props}) => {
    const [showTaskModal, setTaskModalState] = useState(false)


    const handleTaskModalState = () => {
        setTaskModalState(!showTaskModal)
    }


    return(
        <>
            {showTaskModal && <CreateTaskModal cancel={handleTaskModalState}/>}
            <Box
            width={{
                lg: "350px",
                md: "350px",
                sm: "100vw",
                xs: "100vw"
            }}
            sx={{
                backgroundColor: `${colors.primaryBlue}`,
                ...(props.device && {...smallDeviceStyle})
            }}
            >
                <Grid container spacing={1}>
                    <Grid item lg={3} sm={3} xs={3}
                        sx={{
                            ...customGridItemStyle
                        }}
                    >
                        <Button
                        sx={{
                            ...customButtonStyle
                        }}
                        onClick={handleTaskModalState}
                        >
                            <Image 
                            src="../svg/add-task.svg" 
                            alt="Add task" 
                            width={40}
                            height={40}
                            />
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={3} xs={3}
                        sx={{
                            ...customGridItemStyle
                        }}
                    >
                        <Button
                        sx={{
                            ...customButtonStyle
                        }}
                        >
                            <Image
                             src="../svg/graph.svg" 
                             alt="Statistics"
                             width={40}
                             height={40}
                              />
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={3} xs={3}
                        sx={{
                            ...customGridItemStyle
                        }}
                    >
                        <Button
                        sx={{
                            ...customButtonStyle
                        }}
                        >
                            <Image
                             src="../svg/stars.svg" 
                             alt="Statistics"
                             width={40}
                             height={40}
                              />                        
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={3} xs={3}
                        sx={{
                            ...customGridItemStyle
                        }}
                    >
                        <Button
                        sx={{
                            ...customButtonStyle
                        }}
                        >
                            <Image
                             src="../svg/share-calendar.svg" 
                             alt="Statistics"
                             width={40}
                             height={40}
                              />                      
                          </Button>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    )
}

export default TaskMenu