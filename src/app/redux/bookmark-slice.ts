import { createSlice } from "@reduxjs/toolkit";

interface BookmarkState {
    chore: boolean;
    event: boolean,
    isAnimating: boolean;
}

const initialState: BookmarkState =  { 
    //nešto ne radi ovdje
    chore : false,
    event : true,
    isAnimating : false
}

const bookmarkSlice = createSlice({
    initialState,
    name: "bookmarkSlice",
    reducers: {
        toggleBookmarkValues(state){
            state.event = !state.event   
            state.chore = !state.chore   
            console.log("chore:", state.chore , "event: ", state.event)
        },
        setAnimating(state, action) {
            state.isAnimating = action.payload;
        },
    },
});

export default bookmarkSlice 
export const  { toggleBookmarkValues, setAnimating } = bookmarkSlice.actions