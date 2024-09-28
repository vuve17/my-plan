import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Achievement } from "../lib/types";

interface AchievementsInterface {
    achievements: Achievement[];
}

const initialState: AchievementsInterface = {
     achievements: [] 
};

const achievementsSlice = createSlice({
    name: "achievements",
    initialState,
    reducers: {
        setReduxAchievements(state, action: PayloadAction<Achievement[] | []>) {
            if(Array.isArray(action.payload))
            {
                if(action.payload.length === 0)
                {
                    return
                }
                else {
                    state.achievements = action.payload;
                }
            }
            state.achievements = action.payload;
        },
        // updateAchievements
    },
});

export const { setReduxAchievements } = achievementsSlice.actions;
export default achievementsSlice.reducer;
