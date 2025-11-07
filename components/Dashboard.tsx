import React from 'react';
import { User, Quest } from '../types';
import { DAILY_QUESTS, ICONS } from '../constants';
import {
  panelClass,
  cardClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  labelMutedClass,
  pillMutedClass,
  statStackClass,
  ghostButtonClass,
  primaryButtonClass,
  outlineButtonClass,
} from './ui/primitives';

interface DashboardProps {
  user: User;
  onStartLesson: (lessonId: string) => void;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="mt-3 h-2 w-full rounded-full bg-surface-border/60">
    <div
      className="h-2 rounded-full bg-gradient-to-r from-primary via-violet/70 to-primary-strong"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const QuestItem: React.FC<{ quest: Quest }> = ({ quest }) => {
  const completion = Math.round((quest.progress / quest.goal) * 100);
  return (
    <li className={`${cardClass} flex flex-col gap-3 p-5 transition hover:bg-surface-card/60`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink-primary">{quest.title}</p>
          <p className="text-xs text-ink-muted">{quest.description}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {quest.xpReward ? `${quest.xpReward} XP` : ''}
          {quest.xpReward && quest.gemReward ? ' · ' : ''}
          {quest.gemReward ? `${quest.gemReward} Gems` : ''}
        </span>
      </div>
      <ProgressBar progress={completion} />
      <p className="text-xs text-ink-muted">{quest.progress} / {quest.goal} completed</p>
    </li>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ user, onStartLesson }) => {
  return (
    <div className="space-y-8">
      <header className={`${panelClass} overflow-hidden`}> 
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-primary/25 via-transparent to-violet/20 p-8">
          <div className="absolute inset-y-0 right-0 hidden h-full w-64 translate-x-16 rounded-full bg-primary/30 blur-3xl md:block"></div>
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className={labelMutedClass}>Welcome back</p>
              <h1 className="text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl">
                Ready for another Python breakthrough, {user.name.split(' ')[0]}?
              </h1>
              <p className="mt-2 text-sm text-ink-secondary">
                Continue your Control Flow lesson or tackle a fresh challenge from the skill map. Your streak and XP boosters are waiting.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink-muted">
                <span className={pillMutedClass}>
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  {user.streak} day streak
                </span>
                <span className={pillMutedClass}>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {user.xp} XP earned
                </span>
                <span className={pillMutedClass}>
                  <span className="h-2 w-2 rounded-full bg-gem" />
                  {user.gems} gems banked
                </span>
              </div>
            </div>
            <div className="flex items-end gap-4 self-stretch rounded-2xl border border-surface-border/60 bg-surface-card/70 p-5 shadow-elevation-1">
              <div className="flex h-full flex-col justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Focus Lesson</p>
                <h2 className="text-lg font-semibold text-ink-primary">Introduction to Control Flow</h2>
                <p className="text-xs text-ink-muted">Master branching logic to unlock Projects</p>
                <ProgressBar progress={62} />
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    className={primaryButtonClass}
                    onClick={() => onStartLesson('control-flow')}
                  >
                    <span className="text-white/90">{ICONS.PLAY}</span>
                    <span>Continue lesson</span>
                  </button>
                  <button className={ghostButtonClass}>
                    <span className="text-primary">{ICONS.HINT}</span>
                    <span>Get AI hint</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          <article className={`${panelClass} p-6 sm:p-8`}>
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className={sectionHeadingClass}>Daily Quests</h2>
                <p className={sectionSubtitleClass}>Complete objectives to stack XP multipliers and gem rewards.</p>
              </div>
              <button className={outlineButtonClass}>{ICONS.CHECK}View all quests</button>
            </header>
            <ul className="mt-6 space-y-4">
              {DAILY_QUESTS.map((quest) => (
                <QuestItem key={quest.id} quest={quest} />
              ))}
            </ul>
          </article>

          <article className={`${panelClass} p-6 sm:p-8`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className={sectionHeadingClass}>Practice Boosters</h2>
                <p className="text-sm text-ink-secondary">Curated quick wins to sharpen fundamentals.</p>
              </div>
              <div className="tab-group">
                <button className="active">Trending</button>
                <button>Recommended</button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { title: 'Variables & Data Types', length: '5 min sprint' },
                { title: 'Lists & Dictionaries', length: '10 min challenge' },
                { title: 'Loop Patterns', length: '12 min drill' },
                { title: 'Debugging Basics', length: '8 min review' },
              ].map((session) => (
                <div key={session.title} className={`${cardClass} flex flex-col gap-3 p-5`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-primary">{session.title}</p>
                      <p className="text-xs text-ink-muted">{session.length}</p>
                    </div>
                    <button className="glass-button">
                      <span className="text-primary">{ICONS.PLAY}</span>
                      <span>Start</span>
                    </button>
                  </div>
                  <div className="surface-divider" />
                  <p className="text-xs text-ink-muted">
                    Complete for +25 XP and +5 gems. Perfect for reinforcing fundamentals before your next quest.
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-6 xl:col-span-4">
          <div className={`${panelClass} p-6 sm:p-7`}>
            <p className={sectionHeadingClass}>Your Momentum</p>
            <p className="mt-1 text-sm text-ink-secondary">Track at-a-glance progress across streaks, quests, and tokens.</p>
            <div className={`${statStackClass} mt-6`}>
              <div className={`${cardClass} flex flex-col gap-2 p-4 text-sm`}>
                <p className="text-ink-muted">Streak</p>
                <p className="text-2xl font-semibold text-warning">{user.streak} days</p>
                <p className="text-xs text-ink-muted">Heat up your streak for bonus rewards.</p>
              </div>
              <div className={`${cardClass} flex flex-col gap-2 p-4 text-sm`}>
                <p className="text-ink-muted">XP Earned</p>
                <p className="text-2xl font-semibold text-primary">{user.xp}</p>
                <p className="text-xs text-ink-muted">Complete quests to level up faster.</p>
              </div>
              <div className={`${cardClass} flex flex-col gap-2 p-4 text-sm`}>
                <p className="text-ink-muted">Gems</p>
                <p className="text-2xl font-semibold text-gem">{user.gems}</p>
                <p className="text-xs text-ink-muted">Spend gems in the booster store.</p>
              </div>
            </div>
          </div>

          <div className={`${panelClass} p-6 sm:p-7`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={sectionHeadingClass}>Achievement Spotlight</p>
                <p className="text-sm text-ink-secondary">You’re 2 lessons away from the "Logic Architect" badge.</p>
              </div>
              <span className="badge-soft">New</span>
            </div>
            <div className="mt-6 space-y-4 text-sm text-ink-muted">
              <div className="surface-divider" />
              <p className="text-ink-primary">Unlock Requirements</p>
              <ul className="list-disc pl-5">
                <li>Complete "Functions" and "Project: Calculator"</li>
                <li>Score 90%+ on the next quiz</li>
                <li>Maintain streak for 5 more days</li>
              </ul>
              <button className="glass-button">
                <span className="text-gem">{ICONS.GEM}</span>
                <span>View badge collection</span>
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;
