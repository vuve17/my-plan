import { userLevelGap } from "./level-milestones";

export function calculateProgressBarValue(xp: number): number {
  const levels = Object.values(userLevelGap);

  for (let i = 0; i < levels.length - 1; i++) {
    const currentLevelXP: number = levels[i];
    const nextLevelXP: number = levels[i + 1];

    if (xp >= currentLevelXP && xp < nextLevelXP) {
      const range = nextLevelXP - currentLevelXP;
      const progress = ((xp - currentLevelXP) / range) * 100;
      return Math.round(progress);
    }
  }

  return 100;
}

//  "functions": {
//   "app/api/**/*": {
//     "maxDuration": 5 // All functions can run for a maximum of 5 seconds
//   }
// }
