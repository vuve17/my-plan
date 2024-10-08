'use client'

import React, { useRef, useEffect, useState } from "react";
import { Box } from '@mui/material';
import { Source_Serif_4 } from "next/font/google";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { setBookmarkValue, setAnimating } from "@/app/redux/bookmark-slice";

const SourceSerif4 = Source_Serif_4({
    weight: "700",
    subsets: ['latin'],
});

const bookmarkStyle = {
    cursor: 'pointer',
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "0px",
    minHeight: "100px",
    maxHeight: "150px",
    boxSizing: "border-box",
    borderBottom: "25px solid transparent",
    borderTop: "none",
    zIndex: "5",
    fontSize: "24px",
    color: "white",
};

const Bookmark: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bookmarkType = useSelector((state: RootState) => state.bookmark.type);
    const bookmarkInitalState = bookmarkType === "chore" ? true : false

    const isAnimating = useSelector((state: RootState) => state.bookmark.isAnimating);
    const [animationsCompleted, setAnimationsCompleted] = useState<number>(0); 

    const choreBookmarkRef = useRef<HTMLDivElement>(null);
    const eventBookmarkRef = useRef<HTMLDivElement>(null);

    const startAnimation = (target : "chore" | "event") => {
        setAnimationsCompleted(0); 
        dispatch(setAnimating(true));
        // console.log(animationsCompleted, 1)
        
        const onComplete = () => {
            setAnimationsCompleted(prev => prev + 1);
        };
        console.log(animationsCompleted, 2)
        if (bookmarkType === "chore") {
            console.log("in chore animation")
            animateBookmark2Elements(choreBookmarkRef.current, eventBookmarkRef.current, 150, 100, onComplete);
            console.log(animationsCompleted, 3)
        } else {
            console.log("in event animation")
            animateBookmark2Elements(eventBookmarkRef.current, choreBookmarkRef.current, 150, 100, onComplete);
        }
    }

    useEffect(() => {
        if (animationsCompleted === 2) { 
            dispatch(setAnimating(false));
        }
    }, [animationsCompleted, dispatch]);

    // useEffect(() => {
    //     setAnimationsCompleted(1); 
    // }, [])

    const animateElement = (finalHeight: number, element: HTMLElement, onComplete: () => void) => {
        const initialHeight = element.clientHeight;
        if (initialHeight !== finalHeight) {
            let currentHeight = initialHeight;
            const interval = setInterval(() => {
                if (currentHeight < finalHeight && finalHeight > initialHeight) {
                    currentHeight += 1;
                    element.style.height = currentHeight + "px";
                } else if (currentHeight > finalHeight && finalHeight < initialHeight) {
                    currentHeight -= 1;
                    element.style.height = currentHeight + "px";
                } else {
                    clearInterval(interval);
                    onComplete(); 
                }
            }, 1);
        }
    }

    const animateBookmark2Elements = (
        element1: HTMLElement | null, element2: HTMLElement | null,
        finalHeight1: number, finalHeight2: number,
        onComplete: () => void) => 
    {
        if (element1 && element2) {
            animateElement(finalHeight1, element1, onComplete);
            animateElement(finalHeight2, element2, onComplete);
        }
    }

    const handleBookmarkClickEvent = () => {
        if (!isAnimating) {
            if(bookmarkType === "event")
            {
                startAnimation("chore")
                dispatch(setBookmarkValue("chore"));
            } else {
            startAnimation("event")
            dispatch(setBookmarkValue("event"));
            }
        }
    }

    const handleBookmarkClickChore = () => {
        if (!isAnimating) {
            if(bookmarkType === "chore")
            {
                startAnimation("event")
                dispatch(setBookmarkValue("event"));
            } else {
            startAnimation("chore")
            dispatch(setBookmarkValue("chore"));
            }   
        }
    }

    return (
        <Box
            sx={{
                position: "absolute",
                top: "-10px",
                right: "20px",
                display: "flex",
                flexDirection: "row",
                width: "100px",
                height: "150px",
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
                    marginRight: "20px",
                    height: bookmarkInitalState ? "150px" : "100px",
                }}
                onClick={handleBookmarkClickChore}
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
                    height: bookmarkInitalState ? "100px" : "150px",
                }}
                onClick={handleBookmarkClickEvent}
            >
                E
            </Box>
        </Box>
    );
};

export default Bookmark;
