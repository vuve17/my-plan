import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateTaskModalProps {
    isSnackBarOpen: boolean,
    snackbarText: string,
    snackbarAlertState: "success" | "warning" | "error" 
    // taskModalDate: string
}

const initialState : CreateTaskModalProps = {
    isSnackBarOpen: false,
    snackbarText: "",
    snackbarAlertState: "success",
};

const snackBarSlice = createSlice({
    initialState,
    name: "snackBar",
    reducers: {
        setIsSnackBarOpen(state, action:PayloadAction<boolean>){
            state.isSnackBarOpen = action.payload
        },
        setSnackBarText(state, action:PayloadAction<string>){
            state.snackbarText = action.payload
        },
        setSnackbarAlertState(state, action:PayloadAction<"success" | "warning" | "error">){
            state.snackbarAlertState = action.payload
        },

    } 
})

export const { setIsSnackBarOpen, setSnackBarText, setSnackbarAlertState } = snackBarSlice.actions;
export default snackBarSlice.reducer;