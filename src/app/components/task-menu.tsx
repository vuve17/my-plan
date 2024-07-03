import React, { useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import colors from '../ui/colors';
import CreateTaskModal from './create-task-modal';

interface TaskMenuProps {}

const buttonStyle = {
    padding: "3px",
    backgroundColor: 'white',
    position: "relative",
    width: {
        xs: '60px',  
        sm: '70px',  
        // md: '40px',  
        lg: '60px',  
        xl: '60px',
    },  
    height: {
        xs: '60px', 
        sm: '70px',
        // md: '40px',
        lg: '60px',
        xl: '60px',
    },
    borderRadius: "8px",
}



const TaskMenu: React.FC<TaskMenuProps> = () => {
    const [showTaskModal, setTaskModalState] = useState(false);

    const handleTaskModalState = () => {
        setTaskModalState(!showTaskModal);
    };



    return (
        <>

            <Box
            className={"task-menu"}
            sx={{
                display: "flex",
                zIndex: 10,
                justifyContent: "space-between",
                backgroundColor: colors.primaryBlue,
                boxSizing: "border-box",
                gap: "10px",
                padding:{
                    xs: '10px 20px 10px 20px',  
                    sm: '30px 60px 30px 60px',  
                    md: '10px 8px 10px 8px',  
                    lg: '16px 20px 16px 20px ',  
                    xl: '20px 20px 20px 20px',
                },

            }}
            >
                <Button 
                onClick={handleTaskModalState}
                sx={buttonStyle}
                >

                        <img
                            src="../svg/add-task.svg"
                            alt="Add task"    
                        />
                </Button>

                <Button
                sx={buttonStyle}
                >
                        <img 
                        src="../svg/graph.svg" 
                        alt="Statistics"                                    
                        />

                </Button>
                <Button 
                sx={buttonStyle}
                >
                        <img 
                        src="../svg/stars.svg" 
                        alt="Statistics"                                                                     
                    />

                </Button>

                <Button 
                sx={buttonStyle}
                >
                        <img
                        src="../svg/share-calendar.svg" 
                        alt="Statistics"                      
                        />
                </Button>
            </Box>

        </>
    );
};

export default TaskMenu;
