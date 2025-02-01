"use client";

export const userLevelGap = {
  LVL1: 0,
  LVL2: 200,
  LVL3: 400,
  LVL4: 1000,
  LVL5: 3000,
  LVL6: 5000,
  LVL7: 7500,
  LVL8: 10000,
  LVL9: 15000,
  LVL10: 20000,
};

export function levelMilestones(xp: number): number {
  switch (true) {
    case xp > userLevelGap.LVL10:
      return 10;
    case xp > userLevelGap.LVL9:
      return 9;
    case xp > userLevelGap.LVL8:
      return 8;
    case xp > userLevelGap.LVL7:
      return 7;
    case xp > userLevelGap.LVL6:
      return 6;
    case xp > userLevelGap.LVL5:
      return 5;
    case xp > userLevelGap.LVL4:
      return 4;
    case xp > userLevelGap.LVL3:
      return 3;
    case xp > userLevelGap.LVL2:
      return 2;
    default:
      return 1;
  }
}
