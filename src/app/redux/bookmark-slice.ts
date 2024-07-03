import { createSlice } from "@reduxjs/toolkit";

interface BookmarkState {
    bookmarkValue: boolean | null;
    isAnimating: boolean;
}

const initialState: BookmarkState =  { bookmarkValue : null, isAnimating : false }

const bookmarkSlice = createSlice({
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

export default bookmarkSlice 
export const  {toggleBookmarkValueEvent, toggleBookmarkValueChore, setAnimating} = bookmarkSlice.actions