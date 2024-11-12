import React, { useState } from 'react';
import Carousel, { ItemObject } from 'react-elastic-carousel';
import { Backdrop, Box, SvgIcon} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { RootState } from "@/app/redux/store";

interface AchievementCarouselProps {
    achievements: React.ReactNode[];
    initialActiveIndex: number;
    open: boolean;
    hlandleClose: () => void;
}

const AchievementCarousel: React.FC<AchievementCarouselProps> = ({ achievements, initialActiveIndex, open, hlandleClose }) => {

    const [currentItemIndex, setCurrentItemIndex] = useState(initialActiveIndex);
    const handleItemChange = (currentItem: ItemObject) => {
        setCurrentItemIndex(currentItem.index);
    };
    const isMobile = useSelector((state : RootState) => state.screen.isMobile)

    const breakpoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 900, itemsToShow: 1 },
        { width: 1200, itemsToShow: 3 },
    ];

    return (
        <Backdrop
            open={open}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1300,
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}
            
        >
          <SvgIcon
            component={CloseOutlinedIcon}
            onClick={hlandleClose}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              margin: "1em",
              color: 'white',
              cursor: "pointer",
              fontSize: "2rem"
            }}
          />

            <Carousel
                breakPoints={breakpoints}
                initialActiveIndex={initialActiveIndex}
                focusOnSelect={true}
                onChange={handleItemChange}
            >
                {achievements.map((item, index) => (
                    <Box
                        key={index}
                        className={`carousel-item ${isMobile ? "center-item" : index === currentItemIndex + 1 ? "center-item" : ""}`}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "350px",
                            maxHeight: "300px",
                            padding: "10px",
                            boxSizing: "border-box",
                        }}
                    >
                        {item}
                    </Box>
                ))}
            </Carousel>
        </Backdrop>
    );
}

export default AchievementCarousel;
