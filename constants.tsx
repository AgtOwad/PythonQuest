
import React from 'react';
import { User, LearningNode, Edge, Quest, Lesson, NodeStatus, NodeType } from './types';

export const ICONS = {
    PYTHON: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-[#306998]"><path d="M13.5 9a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm-3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.13 14.86c-1.33 0-2.36-.61-2.36-1.57 0-.75.7-1.32 1.95-1.55l.81-.15c.34-.06.49-.19.49-.41 0-.24-.26-.4-.68-.4-.5 0-.81.21-.86.6h-1.1c.05-1.02.9-1.63 2.03-1.63 1.31 0 2.15.63 2.15 1.57 0 .76-.6 1.3-1.83 1.54l-.81.16c-.4.07-.59.21-.59.44 0 .28.3.43.76.43.58 0 .89-.28.94-.71h1.09c-.06 1.05-.96 1.73-2.27 1.73zm4.18-1.21c0 .54-.15.9-.48 1.15-.33.24-.79.37-1.35.37-.88 0-1.6-.37-2.11-.99l.73-.73c.39.46.9.73 1.38.73.41 0 .64-.13.64-.38 0-.24-.23-.37-.7-.37h-.4v-1.02h.39c.6 0 .88-.13.88-.47 0-.26-.26-.4-.68-.4-.41 0-.75.18-.94.51l-.73-.68c.41-.67 1.18-1.05 2.1-1.05.85 0 1.41.25 1.73.65.33.4.48.92.48 1.54v.47H15.05v.19h.03z"/></svg>,
    DASHBOARD: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    LEARNING_PATH: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8Z"></path><path d="M12 2v20"></path><path d="m20 12-8 8-8-8"></path></svg>,
    LESSON: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    PROFILE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    LEADERBOARD: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    SETTINGS: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.22l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.22l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    STORE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.5 12-7-10-7 10 7 10 7-10z"></path></svg>,
    LOGOUT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    CHECK: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    LOCK: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
    PROJECT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    QUIZ: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12.5 15.5c.5-2.5-2-3-2-5"></path><path d="M12 19.5v.5"></path></svg>,
    CODE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
    GEM: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M12 22V9"></path><path d="m3.5 8.5 17 0"></path><path d="m2 9 4-6"></path><path d="m22 9-4-6"></path></svg>,
    HINT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    PLAY: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
    SPARK: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="m4.93 4.93 2.83 2.83"></path><path d="m16.24 16.24 2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m4.93 19.07 2.83-2.83"></path><path d="m16.24 7.76 2.83-2.83"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    LOGIN: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>,
    USER_PLUS: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>,
    RESET: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9"></path><polyline points="21 3 21 12 12 12"></polyline></svg>,
    BELL: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    WIFI_OFF: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 2 20 20"></path><path d="M16.72 11.06C15.07 9.95 13.07 9.31 11 9.31c-2.35 0-4.69.8-6.58 2.31"></path><path d="M5 13.11c1.6-1.23 3.54-1.9 5.51-1.9 1.61 0 3.21.45 4.61 1.3"></path><path d="M8.53 16.11a6 6 0 0 1 6.94 0"></path><path d="M12 20h.01"></path></svg>,
    WARNING: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    TROPHY: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10"></path><path d="M17 4v4a5 5 0 0 1-10 0V4"></path><path d="M5 4h2v4a5 5 0 0 1-5 5"></path><path d="M19 4h2v4a5 5 0 0 0 5 5"></path></svg>,
    SHARE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
    BOXES: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.21 12 2l4.5 2.21"></path><path d="M7.5 19.79 12 22l4.5-2.21"></path><path d="M3 7l9 5 9-5"></path><path d="M3 17l9 5 9-5"></path><path d="M3 12l9 5 9-5"></path></svg>,
    LOADER: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>,
};


export const MOCK_USER: User = {
    name: 'Alex Doe',
    level: 5,
    xp: 450,
    streak: 15,
    gems: 1250,
    avatarUrl: 'https://picsum.photos/id/237/100/100',
};

export const LEARNING_NODES: LearningNode[] = [
  { id: 'basics', title: 'Python Basics', type: NodeType.LESSON, status: NodeStatus.COMPLETED, position: { x: 1, y: 2 }, icon: ICONS.LESSON },
  { id: 'variables', title: 'Variables Quiz', type: NodeType.QUIZ, status: NodeStatus.COMPLETED, position: { x: 2, y: 3 }, icon: ICONS.QUIZ },
  { id: 'control-flow', title: 'Control Flow', type: NodeType.LESSON, status: NodeStatus.IN_PROGRESS, position: { x: 3, y: 2 }, icon: ICONS.CODE },
  { id: 'functions', title: 'Functions', type: NodeType.LESSON, status: NodeStatus.UNLOCKED, position: { x: 4, y: 1 }, icon: ICONS.LESSON },
  { id: 'project-calculator', title: 'Project: Calculator', type: NodeType.PROJECT, status: NodeStatus.UNLOCKED, position: { x: 4, y: 3 }, icon: ICONS.PROJECT },
  { id: 'data-structures', title: 'Data Structures', type: NodeType.LESSON, status: NodeStatus.LOCKED, position: { x: 5, y: 1 }, icon: ICONS.LOCK },
  { id: 'dictionaries', title: 'Dictionaries Quiz', type: NodeType.QUIZ, status: NodeStatus.LOCKED, position: { x: 5, y: 4 }, icon: ICONS.LOCK },
  { id: 'lists-tuples', title: 'Lists & Tuples', type: NodeType.LESSON, status: NodeStatus.LOCKED, position: { x: 3, y: 4 }, icon: ICONS.LOCK },
  { id: 'oop', title: 'OOP Concepts', type: NodeType.LESSON, status: NodeStatus.LOCKED, position: { x: 6, y: 2 }, icon: ICONS.LOCK },
];

export const LEARNING_EDGES: Edge[] = [
    { from: 'basics', to: 'variables' },
    { from: 'variables', to: 'control-flow' },
    { from: 'control-flow', to: 'functions' },
    { from: 'control-flow', to: 'project-calculator' },
    { from: 'functions', to: 'data-structures' },
    { from: 'project-calculator', to: 'dictionaries' },
    { from: 'variables', to: 'lists-tuples' },
    { from: 'data-structures', to: 'oop' },
    { from: 'dictionaries', to: 'oop' },
];

export const DAILY_QUESTS: Quest[] = [
    { id: 'q1', title: 'Complete 3 lessons', description: '+100 XP, +25 Gems', progress: 1, goal: 3, gemReward: 25, xpReward: 100 },
    { id: 'q2', title: 'Earn 500 XP', description: '+50 Gems', progress: 450, goal: 500, gemReward: 50, xpReward: 0 },
];

export const LESSON_CONTENT: { [key: string]: Lesson } = {
    'control-flow': {
        id: 'control-flow',
        title: 'Lesson: Introduction to Control Flow',
        description: 'Write a Python function `get_grade` that takes a numerical score and returns a letter grade (A, B, C, D, F) based on the following scale: 90-100: A, 80-89: B, 70-79: C, 60-69: D, <60: F.',
        starterCode: `def get_grade(score):
    # Your code here
    if score >= 90:
        return "A"
    # Add the rest of the conditions
    
    return "F"

# Example usage (you can change this to test)
print(get_grade(85))
`,
        tests: [
            { description: "Test with score 95", code: "assert get_grade(95) == 'A'" },
            { description: "Test with score 85", code: "assert get_grade(85) == 'B'" },
            { description: "Test with score 75", code: "assert get_grade(75) == 'C'" },
            { description: "Test with score 65", code: "assert get_grade(65) == 'D'" },
            { description: "Test with score 55", code: "assert get_grade(55) == 'F'" },
            { description: "Test edge case 90", code: "assert get_grade(90) == 'A'" },
            { description: "Test edge case 60", code: "assert get_grade(60) == 'D'" },
        ]
    }
};

export const LEADERBOARD_DATA = [
    { rank: 1, name: 'Maria S.', xp: 5430, avatar: 'https://picsum.photos/id/1/40/40' },
    { rank: 2, name: 'Kenji T.', xp: 5210, avatar: 'https://picsum.photos/id/2/40/40' },
    { rank: 3, name: 'Chloe B.', xp: 5150, avatar: 'https://picsum.photos/id/3/40/40' },
    { rank: 45, name: 'You', xp: 3880, avatar: MOCK_USER.avatarUrl },
    { rank: 46, name: 'David R.', xp: 3875, avatar: 'https://picsum.photos/id/4/40/40' },
    { rank: 47, name: 'Aisha K.', xp: 3850, avatar: 'https://picsum.photos/id/5/40/40' },
];

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Choose Your Python Path',
    description: 'Tell us how you prefer to learn so we can tailor lessons, quests, and pacing to you.',
    badge: 'Personalized Learning',
    highlights: ['Daily quests tuned to your focus areas', 'Skill map unlocks in curated order'],
  },
  {
    id: 2,
    title: 'Practice With Real Projects',
    description: 'Ship guided challenges inspired by real-world workflows and build a portfolio as you grow.',
    badge: 'Hands-on Practice',
    highlights: ['Guided project templates', 'Instant feedback on submissions'],
  },
  {
    id: 3,
    title: 'Stay Motivated Every Day',
    description: 'Maintain streaks, climb the leaderboard, and earn gems to unlock celebratory cosmetics.',
    badge: 'Stay Motivated',
    highlights: ['Smart reminders keep you on track', 'Weekly rewards for consistent learning'],
  },
];

export const AUTH_TIPS = [
  'No password yet? Use passkeys or single-use codes for faster sign in.',
  'We encrypt your progress and achievements so you can resume learning anywhere.',
  'Enable multi-factor authentication in settings for additional account security.',
];

export const NOTIFICATIONS_FEED = [
  {
    id: 'notif-1',
    title: 'Daily Quest Complete',
    message: 'You earned 50 XP and 10 gems for finishing “Solve 3 Code Puzzles”.',
    time: '2m ago',
    tone: 'success',
  },
  {
    id: 'notif-2',
    title: 'New Lesson Unlocked',
    message: 'Functions & Scope is now available. Tackle it next to keep your streak.',
    time: '1h ago',
    tone: 'info',
  },
  {
    id: 'notif-3',
    title: 'Community Challenge',
    message: 'Join this weekend’s “Debug Dash” sprint and win a limited avatar frame.',
    time: 'Yesterday',
    tone: 'promo',
  },
];

export const QUIZ_PROMPTS = [
  {
    id: 'q1',
    question: 'What is the output of `print(type([]))`?',
    options: ['<class "tuple">', '<class "list">', '<class "dict">', '<class "set">'],
    correct: 1,
  },
  {
    id: 'q2',
    question: 'Which keyword defines a function in Python?',
    options: ['func', 'define', 'def', 'lambda'],
    correct: 2,
  },
  {
    id: 'q3',
    question: 'What does `len({1, 2, 2, 3})` evaluate to?',
    options: ['2', '3', '4', 'TypeError'],
    correct: 1,
  },
];

export const RESULTS_SUMMARY = {
  title: 'Control Flow Quiz',
  score: 92,
  streakBonus: '+20 XP streak bonus',
  highlights: ['Perfect on conditional logic', 'Needs review on loops'],
  actions: ['Review solution', 'Try a harder quiz', 'Share progress'],
};

export const PROJECT_BLUEPRINT = {
  title: 'Build a Habit Tracker CLI',
  summary:
    'Create a command-line habit tracker that stores entries locally, calculates streaks, and visualizes weekly progress.',
  checkpoints: [
    'Design data model & storage format',
    'Implement add/list/reset commands',
    'Render weekly progress chart with ASCII bars',
  ],
  mentorTips: [
    'Keep functions pure for testability',
    'Write integration tests for edge cases',
    'Use colorama for celebratory output',
  ],
};

export const STORE_FEATURES = [
  { id: 'bundle-1', name: 'Starter Avatar Frames', price: 250, tag: 'Popular', description: 'Unlock 5 animated frames to customize your profile.' },
  { id: 'bundle-2', name: 'Focus Music Pack', price: 180, tag: 'New', description: 'Ambient soundscapes to keep you in flow while coding.' },
  { id: 'bundle-3', name: 'Challenge Tokens', price: 320, tag: 'Limited', description: 'Redeem for special weekend boss quests with unique rewards.' },
];

export const ACHIEVEMENT_CARD = {
  title: 'Debug Dynamo',
  description: 'Completed 10 debugging challenges in a row without a hint.',
  shareCopy: 'I just claimed the Debug Dynamo badge on PythonQuest! Ready to tackle your next bug battle?',
  reward: 'Earned 500 XP · 150 Gems',
};

export const EMPTY_STATE_GUIDE = {
  title: 'No Saved Projects Yet',
  description: 'Ship your first guided challenge to see it listed here. Use the starter kits to move fast.',
  cta: 'Browse project templates',
  helper: 'Projects sync automatically across devices once published.',
};

export const OFFLINE_GUIDE = {
  title: 'Connection Lost',
  description: 'We paused streak timers until you reconnect. Practice in offline mode and sync progress later.',
  checklist: ['Retry connection', 'Enable offline lessons', 'Download streak-safe pack'],
};

export const ERROR_HELP = {
  title: 'Something Went Wrong',
  description: 'The lesson service is taking longer than expected. Try the quick fixes below or reach out for help.',
  steps: ['Retry request', 'Check service status', 'Contact support'],
};

export const HINT_PLAYBOOK = {
  title: 'Stuck on Control Flow?',
  framing: 'Try thinking about guard clauses to simplify branching.',
  tactics: ['Start with the failing test', 'Write a truth table for inputs', 'Add print statements strategically'],
  additionalHelp: 'Ask the AI mentor for a step-by-step walkthrough.',
};

export const LOADING_SKELETONS = [
  { id: 's1', label: 'Preparing workspace' },
  { id: 's2', label: 'Loading personalized quests' },
  { id: 's3', label: 'Warming up AI mentor' },
];
