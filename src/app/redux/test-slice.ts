import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScreenState {
    test: boolean;
}

const initialState: ScreenState = { test: true };

const testSlice = createSlice({
    name: "screen1500",
    initialState,
    reducers: {
        setTest(state, action: PayloadAction<boolean>) {
            state.test = action.payload;
        },
    },
});

export const { setTest } = testSlice.actions;
export default testSlice.reducer;
