// import { createSlice } from "@reduxjs/toolkit";

// interface BookmarkState {
//     chore: boolean;
//     event: boolean,
//     isAnimating: boolean;
// }

// const initialState: BookmarkState =  { 
//     //nešto ne radi ovdje
//     chore : false,
//     event : true,
//     isAnimating : false
// }

// const bookmarkSlice = createSlice({
//     initialState,
//     name: "bookmarkSlice",
//     reducers: {
//         toggleBookmarkValues(state){
//             state.event = !state.event   
//             state.chore = !state.chore   
//             console.log("chore:", state.chore , "event: ", state.event)
//         },
//         setAnimating(state, action) {
//             state.isAnimating = action.payload;
//         },
//         // setActiveType(state, action) {
//             // activeType =  'chore' | 'event' | 'task' | 'appointment'
//         //     state.activeType = action.payload;  // Directly set the active type based on action payload
//         //     console.log("activeType:", state.activeType);
//         // },
//     },
// });

        // setActiveType(state, action) {
            // activeType =  'chore' | 'event' | 'task' | 'appointment'
        //     state.activeType = action.payload;  // Directly set the active type based on action payload
        //     console.log("activeType:", state.activeType);
        // },

// export default bookmarkSlice 
// export const  { toggleBookmarkValues, setAnimating } = bookmarkSlice.actions

import { createSlice } from "@reduxjs/toolkit";

interface BookmarkState {
    type: "chore" | "event",
    isAnimating: boolean;
}

const initialState: BookmarkState =  { 
    type: "chore",
    isAnimating : false
}

const bookmarkSlice = createSlice({
    initialState,
    name: "bookmarkSlice",
    reducers: {
        toggleBookmarkValues(state, action){
            state.type = action.payload;  
            console.log("activeType:", state.type);
        },
        setAnimating(state, action) {
            state.isAnimating = action.payload;
        },

    },
});

export default bookmarkSlice 
export const  { toggleBookmarkValues, setAnimating } = bookmarkSlice.actions