"use client";

import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Source_Serif_4 } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { setBookmarkValue, setAnimating } from "@/app/redux/bookmark-slice";

const SourceSerif4 = Source_Serif_4({ weight: "700", subsets: ["latin"] });

const bookmarkStyle = {
  cursor: "pointer",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "0px",
  boxSizing: "border-box",
  borderBottom: "25px solid transparent",
  borderTop: "none",
  zIndex: "5",
  fontSize: "24px",
  color: "white",
  transition: "height 0.3s ease-in-out",
};

const Bookmark: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookmarkType = useSelector((state: RootState) => state.bookmark.type);
  const isAnimating = useSelector(
    (state: RootState) => state.bookmark.isAnimating
  );

  const choreBookmarkRef = useRef<HTMLDivElement>(null);
  const eventBookmarkRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = () => {
    if (isAnimating) return;
    dispatch(setAnimating(true));

    const newType = bookmarkType === "event" ? "chore" : "event";

    setTimeout(() => {
      dispatch(setBookmarkValue(newType));
      dispatch(setAnimating(false));
    }, 300);
  };

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
          height: bookmarkType === "chore" ? "150px" : "50px",
        }}
        onClick={toggleBookmark}
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
          height: bookmarkType === "event" ? "150px" : "50px",
        }}
        onClick={toggleBookmark}
      >
        E
      </Box>
    </Box>
  );
};

export default Bookmark;
