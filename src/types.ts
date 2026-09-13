export type GameState = 'MENU' | 'INTRO' | 'CUSTOMIZE' | 'HOW_TO_PLAY' | 'OVERWORLD' | 'BATTLE' | 'ENDING';

export type RouteType = 'PACIFIST' | 'NEUTRAL' | 'GENOCIDE';

export interface InsideJoke {
  id: string;
  title: string;
  description: string;
  actOption: string;
  bossReaction: string;
  damageReductionOrSpareBonus: number; // Spare percentage gained or boss attack weakening
}

export interface Item {
  id: string;
  name: string;
  description: string;
  healAmount: number;
  iconName: string;
}

export interface FriendPreset {
  friendName: string;
  creatorName: string;
  age?: number;
  specialDate?: string;
  birthdayWishMessage: string;
  photoUrl?: string;
  bossName: string;
  bossTitle: string;
  insideJokes: InsideJoke[];
  memories: string[];
}

export interface AttackPattern {
  id: string;
  name: string;
  duration: number; // in seconds
  description: string;
  type: 'CANDLES' | 'PIZZA_DISCORD' | 'ZAP_BUBBLES' | 'CONFETTI' | 'BIG_CAKE' | 'FRIENDSHIP_RAIN';
}

export interface BossState {
  name: string;
  title: string;
  maxHp: number;
  hp: number;
  sparePercent: number; // 0 to 100%
  isSpared: boolean;
  isDefeated: boolean;
  currentDialogue: string;
  mood: 'NEUTRAL' | 'HAPPY' | 'SURPRISED' | 'EMOTIONAL' | 'ANGRY';
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  lv: number;
  gold: number;
  items: Item[];
  moralPoints: number; // positive = merciful, negative = fight
}
