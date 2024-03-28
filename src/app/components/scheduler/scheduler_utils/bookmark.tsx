import React, { useState, useRef, useEffect } from "react";
import { Box } from '@mui/material';
import { Source_Serif_4 } from "next/font/google";

interface BookmarkProps {
    value: boolean | null;
    onClick?: () => void;
}

const SourceSerif4 = Source_Serif_4({
    weight: "700",
    subsets: ['latin'],
});

const bookmarkStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "0px",
    minHeight: "100px",
    height: "100px",
    boxSizing: "border-box",
    border: "1px solid #000",
    borderBottom: "25px solid transparent",
    borderTop: "none",
    zIndex: "5",
    fontSize: "24px",
    color: "white"
};

const Bookmark: React.FC<BookmarkProps> = ({...props}) => {
    const [selectedValue, setSelectedValue] = useState<boolean | null>(null);
    const choreBookmarkRef = useRef<HTMLDivElement>(null);
    const eventBookmarkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedValue === true) {
            animateBookmark(choreBookmarkRef.current, 100); 
            animateBookmark(eventBookmarkRef.current, 150); 
        } else if (selectedValue === false) {
            animateBookmark(eventBookmarkRef.current, 100); 
            animateBookmark(choreBookmarkRef.current, 150); 
        } else {
            animateBookmark(choreBookmarkRef.current, 100); 
            animateBookmark(eventBookmarkRef.current, 100);
        }
    }, [selectedValue]);
    

    const animateBookmark = (element: HTMLElement | null, finalHeight: number) => {
        if (element) {
            const initialHeight = element.clientHeight;
            console.log(initialHeight, " ", finalHeight)
            if (initialHeight !== finalHeight) {
                let currentHeight = initialHeight;
                const interval = setInterval(() => {
                    if (currentHeight < finalHeight && finalHeight > initialHeight) {
                        currentHeight += 1;
                    } else if (currentHeight > finalHeight && finalHeight < initialHeight) {
                        currentHeight -= 1;
                    } else {
                        clearInterval(interval);
                    }
                    element.style.height = currentHeight + "px";
                }, 10);
            }
        }
    };

    const handleBookmarkClick = ( newValue: boolean | null) => {
        setSelectedValue(newValue);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                transform: "translate(700%, -10%)",
                display: "flex",
                flexDirection: "row",
                width: "100px",
                height: "150px"
            }}
        >
            <Box
                id="choreBookmark"
                ref={choreBookmarkRef}
                className={SourceSerif4.className}
                sx={{
                    ...bookmarkStyle,
                    borderLeft: `30px solid #0081D1`,
                    borderRight: `30px solid #0081D1`,
                    marginRight: "20px"
                }}
                onClick={() => handleBookmarkClick( selectedValue === false ? null : false)}
            >
                C
            </Box>

            <Box
                id="eventBookmark"
                ref={eventBookmarkRef}
                className={SourceSerif4.className}
                sx={{
                    ...bookmarkStyle,
                    borderLeft: `30px solid #3CE239`,
                    borderRight: `30px solid #3CE239`,
                }}
                onClick={() => handleBookmarkClick( selectedValue === true ? null : true)}
            >
                E
            </Box>
        </Box>
    );
};

export default Bookmark;
