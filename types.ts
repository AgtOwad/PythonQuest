
export type User = {
  id: string;
  email: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  gems: number;
  avatarUrl: string;
};

export enum NodeType {
  LESSON = 'LESSON',
  QUIZ = 'QUIZ',
  PROJECT = 'PROJECT',
  SKILL_GROUP = 'SKILL_GROUP',
}

export enum NodeStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type LearningNode = {
  id: string;
  title: string;
  type: NodeType;
  status: NodeStatus;
  position: { x: number; y: number };
  icon: React.ReactNode;
};

export type Edge = {
  from: string;
  to: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  progress: number;
  goal: number;
  gemReward: number;
  xpReward: number;
};

export type Lesson = {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    tests: { description: string; code: string }[];
};

export type OnboardingPreferences = {
  experience: string;
  goal: string;
  cadence: string;
};

export type AuthVariant = 'login' | 'signup' | 'reset-password';

export type View =
  | 'dashboard'
  | 'learning-path'
  | 'lesson'
  | 'profile'
  | 'leaderboard'
  | 'settings'
  | 'store'
  | 'notifications'
  | 'offline'
  | 'error'
  | 'hint'
  | 'quiz'
  | 'results'
  | 'project'
  | 'achievement'
  | 'loading'
  | 'empty-state';
