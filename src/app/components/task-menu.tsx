import React, { useState } from 'react';
import { Button, Box, Grid} from '@mui/material';
import colors from '../ui/colors'
import CreateTaskModal from './create-task-modal';


const customGridItemStyle = {
    display: "flex",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0",
    justifyContent: "center",
    alignItems: "center",
};

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

const TaskMenu:React.FC = () => {
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
                sm: "350px",
                xs: "100%"
            }}
            sx={{
                backgroundColor: `${colors.primaryBlue}`
            }}
            >
                <Grid container>
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
                            <img src="../svg/add-task.svg" alt="Add task" />
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
                            <img src="../svg/graph.svg" alt="Statistics" />
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
                            <img src="../svg/stars.svg" alt="Achievements" />
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
                            <img src="../svg/share-calendar.svg" alt="Add task" />
                        </Button>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    )
}

export default TaskMenu