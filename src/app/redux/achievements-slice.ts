import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Achievement } from "../lib/types";
import { UserAchievement } from "../lib/types";

interface AchievementsInterface {
  achievements: Achievement[];
  newAchievements: UserAchievement[];
  isModalOpen: boolean;
  currentlyOpenAchievement: UserAchievement | null;
}

const initialState: AchievementsInterface = {
  achievements: [],
  newAchievements: [],
  isModalOpen: false,
  currentlyOpenAchievement: null,
};

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    // Set all achievements in the state
    setReduxAchievements(state, action: PayloadAction<Achievement[]>) {
      state.achievements = action.payload;
    },

    // achievements updateee!!!
    // Add new achievements to the queue
    setNewAchievements(state, action: PayloadAction<UserAchievement[]>) {
        const incomingAchievements = action.payload;
        console.log("incomingAchievements: ", incomingAchievements)
        // Filter out achievements from the current state that have the same name as the new ones
        const filteredCurrentAchievements = state.newAchievements.filter(
          (currentAchievement) =>
            !incomingAchievements.some(
              (newAchievement) => newAchievement.name === currentAchievement.name
            )
        );
      
        // Combine the filtered current achievements with the incoming ones
        state.newAchievements = [...filteredCurrentAchievements, ...incomingAchievements];
      },

    // Open the achievement modal
    openNewAchievementModal(state) {
      if (state.newAchievements.length > 0) {
        // Set the current achievement to the first in the queue
        state.currentlyOpenAchievement = state.newAchievements[0];
        // Remove the first achievement from the queue
        state.newAchievements.shift();
        // Open the modal
        state.isModalOpen = true;
      }
    },

    // Close the achievement modal
    closeAchievementModal(state) {
      // Close the modal
      state.isModalOpen = false;
      state.currentlyOpenAchievement = null;

      // If there are still new achievements, repeat the process
      if (state.newAchievements.length > 0) {
        state.isModalOpen = true;
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
