'use client'

import React, { useRef, useEffect, useState } from "react";
import { Box } from '@mui/material';
import { Source_Serif_4 } from "next/font/google";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { toggleBookmarkValues, setAnimating } from "@/app/redux/bookmark-slice";

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
    // const bookmarkEvent = useSelector((state: RootState) => state.bookmark.event);
    // const bookmarkChore = useSelector((state: RootState) => state.bookmark.chore);
    const bookmarkType = useSelector((state: RootState) => state.bookmark.type);

    const isAnimating = useSelector((state: RootState) => state.bookmark.isAnimating);
    const [animationsCompleted, setAnimationsCompleted] = useState(0); 

    const choreBookmarkRef = useRef<HTMLDivElement>(null);
    const eventBookmarkRef = useRef<HTMLDivElement>(null);

    const startAnimation = (target : "chore" | "event") => {
        dispatch(setAnimating(true));
        setAnimationsCompleted(0); 
        const onComplete = () => {
            setAnimationsCompleted(prev => prev + 1);
        };
        
        if (bookmarkType === "chore") {
            animateBookmark2Elements(choreBookmarkRef.current, eventBookmarkRef.current, 150, 100, onComplete);
        } else {
            animateBookmark2Elements(eventBookmarkRef.current, choreBookmarkRef.current, 150, 100, onComplete);
        }
    }

    useEffect(() => {
        if (animationsCompleted === 2) { 
            dispatch(setAnimating(false));
        }
    }, [animationsCompleted, dispatch]);

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
                dispatch(toggleBookmarkValues("chore"));
            } else {
            startAnimation("event")
            dispatch(toggleBookmarkValues("event"));
            }
        }
    }

    const handleBookmarkClickChore = () => {
        if (!isAnimating) {
            if(bookmarkType === "chore")
            {
                startAnimation("event")
                dispatch(toggleBookmarkValues("event"));
            } else {
            startAnimation("chore")
            dispatch(toggleBookmarkValues("chore"));
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
                    height: "150px",
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
                    height: "100px",
                }}
                onClick={handleBookmarkClickEvent}
            >
                E
            </Box>
        </Box>
    );
};

export default Bookmark;
