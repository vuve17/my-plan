import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { levelMilestones } from "../lib/level-milestones";

interface UserState {
  dailyTaskCheck: boolean;
  xp: number;
  level: number;
}

const initialState: UserState = { dailyTaskCheck: false, xp: 0, level: 0 };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDailyTaskCheck(state, action: PayloadAction<boolean>) {
      state.dailyTaskCheck = action.payload;
    },
    setXp(state, action: PayloadAction<number>) {
      state.xp = action.payload;
      console.log("xp:", action.payload);
      state.level = levelMilestones(action.payload);
    },
  },
});

export const { setDailyTaskCheck, setXp } = userSlice.actions;
export default userSlice.reducer;
