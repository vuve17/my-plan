import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Achievement } from "../lib/types";
import { UserAchievement } from "../lib/types";

interface AchievementsInterface {
  achievements: UserAchievement[];
  newAchievements: UserAchievement[];
  currentlyOpenAchievement: UserAchievement | null;
}

const initialState: AchievementsInterface = {
  achievements: [],
  newAchievements: [],
  currentlyOpenAchievement: null,
};

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    setReduxAchievements(state, action: PayloadAction<UserAchievement[]>) {
      state.achievements = action.payload;
    },
    setNewAchievements(state, action: PayloadAction<UserAchievement[]>) {
        const incomingAchievements = action.payload;
        console.log("incomingAchievements (redux): ", incomingAchievements)
        const filteredCurrentAchievements = state.newAchievements.filter(
          (currentAchievement) =>
            !incomingAchievements.some(
              (newAchievement) => newAchievement.name === currentAchievement.name
            )
        );
      
        state.newAchievements = [...filteredCurrentAchievements, ...incomingAchievements];
        console.log("state.newAchievements redux final line: ", state.newAchievements)
      },
    openNewAchievementModal(state) {
      console.log("openNewAchievementModal redux")
      if (state.newAchievements.length > 0) {
        console.log("openNewAchievementModal redux if statement")
        state.currentlyOpenAchievement = state.newAchievements[0];
        state.newAchievements.shift();
      }
    },

    closeAchievementModal(state) {
      state.currentlyOpenAchievement = null;

      if (state.newAchievements.length > 0) {
        state.currentlyOpenAchievement = state.newAchievements[0];
        state.newAchievements.shift();
      }
    },
  },
});

export const {
  setReduxAchievements,
  setNewAchievements,
  openNewAchievementModal,
  closeAchievementModal,
} = achievementsSlice.actions;

export default achievementsSlice.reducer;
