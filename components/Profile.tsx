import React from 'react';
import { User } from '../types';
import {
  panelClass,
  cardClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  pillMutedClass,
  statStackClass,
  outlineButtonClass,
} from './ui/primitives';

interface ProfileProps {
  user: User;
}

const ProgressBar: React.FC<{ progress: number; label: string }> = ({ progress, label }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
      <span>{label}</span>
      <span>{progress}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-surface-border/60">
      <div className="h-2 rounded-full bg-gradient-to-r from-primary via-violet/70 to-primary-strong" style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      <header className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <img className="h-20 w-20 rounded-3xl border border-surface-border/70 object-cover" src={user.avatarUrl} alt={user.name} />
            <div className="space-y-2">
              <h1 className={`${sectionHeadingClass} text-3xl`}>@pythonista23</h1>
              <p className={sectionSubtitleClass}>Level {user.level} · {user.xp} XP</p>
              <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
                <span className={pillMutedClass}>Joined 2024</span>
                <span className={pillMutedClass}>Prefers AI Hints</span>
                <span className={pillMutedClass}>{user.streak}-day streak</span>
              </div>
            </div>
          </div>
          <button className={outlineButtonClass}>Edit profile</button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className={`${panelClass} space-y-6 p-6 sm:p-8 lg:col-span-2`}>
          <div className="flex items-center justify-between">
            <h2 className={sectionHeadingClass}>Skill Mastery</h2>
            <span className="badge-soft">Updated today</span>
          </div>
          <div className="space-y-5">
            <div className={`${cardClass} space-y-4 p-5`}>
              <h3 className="text-sm font-semibold text-ink-primary">Foundations</h3>
              <ProgressBar label="Syntax Basics" progress={95} />
              <ProgressBar label="Data Types" progress={88} />
            </div>
            <div className={`${cardClass} space-y-4 p-5`}>
              <h3 className="text-sm font-semibold text-ink-primary">Intermediate</h3>
              <ProgressBar label="Control Flow" progress={75} />
              <ProgressBar label="Functions" progress={82} />
            </div>
            <div className={`${cardClass} space-y-4 p-5`}>
              <h3 className="text-sm font-semibold text-ink-primary">Upcoming Tracks</h3>
              <ProgressBar label="Data Structures" progress={45} />
              <ProgressBar label="Project Mastery" progress={30} />
            </div>
          </div>
        </article>

        <aside className={`${panelClass} space-y-5 p-6 sm:p-8`}>
          <div>
            <h2 className={sectionHeadingClass}>Recent Activity</h2>
            <p className="mt-1 text-sm text-ink-secondary">Latest quests and milestones from your learning streak.</p>
          </div>
          <div className="space-y-4 text-sm text-ink-muted">
            {[ 
              'Completed: Intro to Dictionaries',
              'Solved: FizzBuzz Challenge',
              'Earned: Syntax Star Badge',
              'Shared: Daily streak screenshot'
            ].map((item) => (
              <div key={item} className={`${cardClass} border border-transparent p-4 transition hover:border-primary/40`}>
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className={sectionHeadingClass}>Weekly Snapshot</h2>
            <p className={sectionSubtitleClass}>At-a-glance stats to keep you motivated.</p>
          </div>
          <div className={`${statStackClass} w-full lg:max-w-xl`}>
            <div className={`${cardClass} space-y-2 p-4 text-sm`}>
              <p className="text-ink-muted">Lessons Completed</p>
              <p className="text-2xl font-semibold text-primary">6</p>
              <p className="text-xs text-ink-muted">Up 20% vs. last week</p>
            </div>
            <div className={`${cardClass} space-y-2 p-4 text-sm`}>
              <p className="text-ink-muted">Practice Sessions</p>
              <p className="text-2xl font-semibold text-gem">4</p>
              <p className="text-xs text-ink-muted">Keep streak alive for bonuses</p>
            </div>
            <div className={`${cardClass} space-y-2 p-4 text-sm`}>
              <p className="text-ink-muted">AI Hints Used</p>
              <p className="text-2xl font-semibold text-warning">2</p>
              <p className="text-xs text-ink-muted">Efficient learning this week</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
