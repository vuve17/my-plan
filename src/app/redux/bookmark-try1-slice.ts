import { createSlice } from "@reduxjs/toolkit";

interface BookmarkState {
    bookmarkValue: boolean;
    isAnimating: boolean;
}

const initialState: BookmarkState =  { bookmarkValue : true, isAnimating : false }

const bookmarkTestSlice = createSlice({
    initialState,
    name: "bookmarkSlice",
    reducers: {
        toggleBookmarkValueEvent(state){
            state.bookmarkValue = state.bookmarkValue === true ? false : true
            console.log("bookmark state: ",state.bookmarkValue)
        },

        toggleBookmarkValueChore(state){
            state.bookmarkValue = state.bookmarkValue === false ? true : false
            console.log("bookmark state: ",state.bookmarkValue)
        },
        setAnimating(state, action) {
            state.isAnimating = action.payload;
            console.log("payload: ", action.payload, " , ",  state.isAnimating)
        },
    },
});

export default bookmarkTestSlice 
export const  {toggleBookmarkValueEvent, toggleBookmarkValueChore, setAnimating} = bookmarkTestSlice.actions