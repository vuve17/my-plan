// 'use client'

// import React, { useRef, useEffect } from "react";
// import { Box } from '@mui/material';
// import { Source_Serif_4 } from "next/font/google";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/app/redux/store';
// import { toggleBookmarkValueEvent, toggleBookmarkValueChore, setAnimating } from "@/app/redux/bookmark-slice";

// const SourceSerif4 = Source_Serif_4({
//     weight: "700",
//     subsets: ['latin'],
// });

// const bookmarkStyle = {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "0px",
//     minHeight: "100px",
//     maxHeight: "150px",
//     height: "100px",
//     boxSizing: "border-box",
//     borderBottom: "25px solid transparent",
//     borderTop: "none",
//     zIndex: "5",
//     fontSize: "24px",
//     color: "white",
// };

// const Bookmark: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const bookmarkState = useSelector((state: RootState) => state.bookmark.bookmarkValue);
//     const isAnimating = useSelector((state: RootState) => state.bookmark.isAnimating);

//     const choreBookmarkRef = useRef<HTMLDivElement>(null);
//     const eventBookmarkRef = useRef<HTMLDivElement>(null);

//     const startAnimation = (target: "chore" | "event") => {
//         dispatch(setAnimating(true));
//         const onComplete = () => dispatch(setAnimating(false));
        
//         // true = chore, false = event
//         if (bookmarkState === true) {
//             if(target === "chore")
//             {
//                 animateBookmark2Elements(choreBookmarkRef.current, eventBookmarkRef.current, 150, 100, onComplete);
//             }
//             animateBookmark2Elements(choreBookmarkRef.current, eventBookmarkRef.current, 100, 150, onComplete);
//         } 
//         else if (bookmarkState === false) {
//             if(target === "event")
//                 {
//                     animateBookmark2Elements(eventBookmarkRef.current, choreBookmarkRef.current, 150, 100, onComplete);
//                 }
//             animateBookmark2Elements( eventBookmarkRef.current, choreBookmarkRef.current, 100, 150, onComplete);
//         }    
//     }

//     const animateBookmark2Elements = (
//         element1: HTMLElement | null, element2: HTMLElement | null, 
//         finalHeight1: number, finalHeight2: number,
//         onComplete: () => void) => {
//             console.log("isAnimating1: ", isAnimating)
//             if (element1 && element2) {
//                 const initialHeight1 = element1.clientHeight;
//                 const initialHeight2 = element2.clientHeight;
//                 if (initialHeight1 !== finalHeight1 ) {
//                     let currentHeight1 = initialHeight1;
//                     const interval = setInterval(() => {
//                         if (currentHeight1 < finalHeight1 && finalHeight1 > initialHeight1) {
//                             currentHeight1 += 1;
//                             element1.style.height = currentHeight1 + "px";
//                         } else if (currentHeight1 > finalHeight1 && finalHeight1 < initialHeight1) {
//                             currentHeight1 -= 1;
//                             element1.style.height = currentHeight1 + "px";
//                         } else {
//                             console.log("isAnimating1: ", isAnimating)
//                             clearInterval(interval);
//                             if (initialHeight2 !== finalHeight2 ) {
//                                 let currentHeight2 = initialHeight2;
//                                 const interval2 = setInterval(() => {
//                                     if (currentHeight2 < finalHeight2 && finalHeight2 > initialHeight2) {
//                                         currentHeight2 += 1;
//                                         element2.style.height = currentHeight2 + "px";
//                                     } else if (currentHeight2 > finalHeight2 && finalHeight2 < initialHeight2) {
//                                         currentHeight2 -= 1;
//                                         element2.style.height = currentHeight2 + "px";
//                                     } else {
//                                         console.log("isAnimating2: ", isAnimating)
//                                         clearInterval(interval2);
//                                         onComplete();
//                                     }
//                                 }, 10);
//                             } 
//                         }
//                     }, 10);
//                 } 

//             }
//     };

        

        
        
//     const handleClickChore = () => {
//         if (!isAnimating) {
//             startAnimation("chore")
//             dispatch(toggleBookmarkValueChore());
//         }
//     };

//     const handleClickEvent = () => {
//         console.log(isAnimating)
//         if (!isAnimating) {
//             startAnimation("event")
//             dispatch(toggleBookmarkValueEvent());
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 position: "absolute",
//                 top: "-10px",
//                 right: "20px",
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "100px",
//                 height: "150px",
//             }}
//         >
//             <Box
//                 id="choreBookmark"
//                 ref={choreBookmarkRef}
//                 className={SourceSerif4.className}
//                 sx={{
//                     ...bookmarkStyle,
//                     borderLeft: `30px solid #0081D1`,
//                     borderRight: `30px solid #0081D1`,
//                     marginRight: "20px",
//                 }}
//                 onClick={handleClickChore}
//             >
//                 C
//             </Box>

//             <Box
//                 id="eventBookmark"
//                 ref={eventBookmarkRef}
//                 className={SourceSerif4.className}
//                 sx={{
//                     ...bookmarkStyle,
//                     borderLeft: `30px solid #3CE239`,
//                     borderRight: `30px solid #3CE239`,
//                 }}
//                 onClick={handleClickEvent}
//             >
//                 E
//             </Box>
//         </Box>
//     );
// };

// export default Bookmark;

// 'use client'

// import React, { useRef, useEffect } from "react";
// import { Box } from '@mui/material';
// import { Source_Serif_4 } from "next/font/google";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/app/redux/store';
// import { toggleBookmarkValueEvent, toggleBookmarkValueChore, setAnimating } from "@/app/redux/bookmark-try1-slice";

// const SourceSerif4 = Source_Serif_4({
//     weight: "700",
//     subsets: ['latin'],
// });

// const bookmarkStyle = {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "0px",
//     minHeight: "100px",
//     maxHeight: "150px",
//     height: "100px",
//     boxSizing: "border-box",
//     borderBottom: "25px solid transparent",
//     borderTop: "none",
//     zIndex: "5",
//     fontSize: "24px",
//     color: "white",
// };

// const Bookmark: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const bookmarkState = useSelector((state: RootState) => state.bookmark);
//     const isAnimating = useSelector((state: RootState) => state.bookmark.isAnimating);

//     const choreBookmarkRef = useRef<HTMLDivElement>(null);
//     const eventBookmarkRef = useRef<HTMLDivElement>(null);

//     const startAnimation = () => {
//         dispatch(setAnimating(true));
//         const onComplete = () => dispatch(setAnimating(false));
        
//         if (bookmarkState === true) {
//             animateBookmark2Elements(choreBookmarkRef.current, eventBookmarkRef.current, 150, 100, onComplete);
//         } else {
//             animateBookmark2Elements( eventBookmarkRef.current, choreBookmarkRef.current, 150, 100, onComplete);
//         } 
//     }

//     const animateBookmark2Elements = (
//         element1: HTMLElement | null, element2: HTMLElement | null, 
//         finalHeight1: number, finalHeight2: number,
//         onComplete: () => void) => {
//             console.log("isAnimating1: ", isAnimating)
//             if (element1 && element2) {
//                 const initialHeight1 = element1.clientHeight;
//                 const initialHeight2 = element2.clientHeight;
//                 if (initialHeight1 !== finalHeight1 ) {
//                     let currentHeight1 = initialHeight1;
//                     const interval = setInterval(() => {
//                         if (currentHeight1 < finalHeight1 && finalHeight1 > initialHeight1) {
//                             currentHeight1 += 1;
//                             element1.style.height = currentHeight1 + "px";
//                         } else if (currentHeight1 > finalHeight1 && finalHeight1 < initialHeight1) {
//                             currentHeight1 -= 1;
//                             element1.style.height = currentHeight1 + "px";
//                         } else {
//                             console.log("isAnimating1: ", isAnimating)
//                             clearInterval(interval);
//                             if (initialHeight2 !== finalHeight2 ) {
//                                 let currentHeight2 = initialHeight2;
//                                 const interval2 = setInterval(() => {
//                                     if (currentHeight2 < finalHeight2 && finalHeight2 > initialHeight2) {
//                                         currentHeight2 += 1;
//                                         element2.style.height = currentHeight2 + "px";
//                                     } else if (currentHeight2 > finalHeight2 && finalHeight2 < initialHeight2) {
//                                         currentHeight2 -= 1;
//                                         element2.style.height = currentHeight2 + "px";
//                                     } else {
//                                         console.log("isAnimating2: ", isAnimating)
//                                         clearInterval(interval2);
//                                         onComplete();
//                                     }
//                                 }, 10);
//                             } 
//                         }
//                     }, 10);
//                 } 

//             }
//     };

        

        
        
//     const handleClickChore = () => {
//         if (!isAnimating) {
            
//             startAnimation()
//             dispatch(toggleBookmarkValueChore());
//         }
//     };

//     const handleClickEvent = () => {
//         if (!isAnimating) {
//             startAnimation()
//             dispatch(toggleBookmarkValueEvent());
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 position: "absolute",
//                 top: "-10px",
//                 right: "20px",
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "100px",
//                 height: "150px",
//             }}
//         >
//             <Box
//                 id="choreBookmark"
//                 ref={choreBookmarkRef}
//                 className={SourceSerif4.className}
//                 sx={{
//                     ...bookmarkStyle,
//                     borderLeft: `30px solid #0081D1`,
//                     borderRight: `30px solid #0081D1`,
//                     marginRight: "20px",
//                 }}
//                 onClick={handleClickChore}
//             >
//                 C
//             </Box>

//             <Box
//                 id="eventBookmark"
//                 ref={eventBookmarkRef}
//                 className={SourceSerif4.className}
//                 sx={{
//                     ...bookmarkStyle,
//                     borderLeft: `30px solid #3CE239`,
//                     borderRight: `30px solid #3CE239`,
//                 }}
//                 onClick={handleClickEvent}
//             >
//                 E
//             </Box>
//         </Box>
//     );
// };

// export default Bookmark;

