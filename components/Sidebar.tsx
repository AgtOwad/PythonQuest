import React from 'react';
import { View, User } from '../types';
import { ICONS } from '../constants';
import { pillMutedClass } from './ui/primitives';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  user: User;
}

const primaryNav: Array<{ key: View; label: string; icon: React.ReactNode }> = [
  { key: 'dashboard', label: 'Dashboard', icon: ICONS.DASHBOARD },
  { key: 'learning-path', label: 'Learning Path', icon: ICONS.LEARNING_PATH },
  { key: 'lesson', label: 'Current Lesson', icon: ICONS.LESSON },
  { key: 'profile', label: 'Profile', icon: ICONS.PROFILE },
  { key: 'leaderboard', label: 'Leaderboard', icon: ICONS.LEADERBOARD },
];

const supportNav: Array<{ key: View | 'settings' | 'store'; label: string; icon: React.ReactNode }> = [
  { key: 'settings', label: 'Settings', icon: ICONS.SETTINGS },
  { key: 'store', label: 'Store', icon: ICONS.STORE },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, user }) => {
  const renderNavItem = (item: { key: string; label: string; icon: React.ReactNode }) => {
    const isActive = item.key === activeView;
    return (
      <button
        key={item.key}
        onClick={() => onNavigate(item.key as View)}
        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
          isActive
            ? 'bg-primary/15 text-ink-primary shadow-elevation-1'
            : 'text-ink-muted hover:bg-surface-card/50 hover:text-ink-primary'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-card/80 text-primary transition group-hover:bg-primary/15">
          {item.icon}
        </span>
        <span className="text-sm font-semibold tracking-tight">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="hidden min-h-screen w-72 flex-shrink-0 border-r border-surface-border/70 bg-surface-base/80 px-6 py-8 backdrop-blur-xl lg:flex">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              {ICONS.PYTHON}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">PythonQuest</p>
              <p className="text-xs text-ink-muted">Design System Edition</p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-surface-border/70 bg-surface-card/70 p-5 shadow-elevation-1">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-12 w-12 rounded-2xl border border-surface-border/70 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-ink-primary">{user.name}</p>
                <p className="text-xs text-ink-muted">Level {user.level}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs font-semibold text-ink-muted">
              <span className="stat-chip">
                <span className="h-2 w-2 rounded-full bg-warning"></span>
                {user.streak} day streak
              </span>
              <span className="stat-chip">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                {user.xp} XP
              </span>
              <span className="stat-chip">
                <span className="h-2 w-2 rounded-full bg-gem"></span>
                {user.gems} gems
              </span>
            </div>
          </div>

          <nav className="space-y-2" aria-label="Primary">
            {primaryNav.map(renderNavItem)}
          </nav>
        </div>

        <div className="space-y-4 pt-6">
          <div className="space-y-2" aria-label="Support">
            {supportNav.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  if (item.key === 'settings') onNavigate('settings');
                  if (item.key === 'store') alert('Store coming soon!');
                }}
                className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-ink-muted transition hover:bg-surface-card/60 hover:text-ink-primary"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-card/80 text-ink-muted transition group-hover:bg-primary/15 group-hover:text-primary">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-surface-border/70 bg-surface-card/70 px-4 py-3 text-xs text-ink-muted">
            <div>
              <p className="font-semibold text-ink-primary">Need a break?</p>
              <p className="text-ink-muted">Switch profiles or log out securely.</p>
            </div>
            <button
              onClick={() => alert('Logged out!')}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary transition hover:bg-primary/30"
              aria-label="Log out"
            >
              {ICONS.LOGOUT}
            </button>
          </div>
          <p className={`${pillMutedClass} w-full justify-center`}>Alpha Build · v0.6.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
