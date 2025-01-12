"use client";

export const userLevelGap = {
  LVL1: 0,
  LVL2: 20,
  LVL3: 50,
  LVL4: 100,
  LVL5: 200,
  LVL6: 350,
  LVL7: 600,
  LVL8: 1000,
  LVL9: 1500,
  LVL10: 2000,
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
