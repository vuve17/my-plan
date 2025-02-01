"use client";

import { UserAchievement } from "./types";

export const getAchievementDetails = (achievement: UserAchievement) => {
  const descriptionKey =
    `description${achievement.stars}` as keyof UserAchievement;
  const imageKey = `image${achievement.stars}` as keyof UserAchievement;
  return {
    image: achievement[imageKey] as string,
    description: achievement[descriptionKey] as string,
  };
};
