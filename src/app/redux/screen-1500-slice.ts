import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScreenState {
    isMobile: boolean;
}

const initialState: ScreenState = { isMobile: false };

const screen1500Slice = createSlice({
    name: "screen1500",
    initialState,
    reducers: {
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload;
        },
    },
});

export const { setIsMobile } = screen1500Slice.actions;
export default screen1500Slice.reducer;
