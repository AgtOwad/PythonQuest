import React, { useState } from 'react';
import {
  panelClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  cardClass,
  outlineButtonClass,
  pillMutedClass,
} from './ui/primitives';

const Toggle: React.FC<{ label: string; description: string; initialValue?: boolean }> = ({ label, description, initialValue }) => {
  const [isOn, setIsOn] = useState(Boolean(initialValue));
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-ink-primary">{label}</p>
        <p className="text-xs text-ink-muted">{description}</p>
      </div>
      <button
        onClick={() => setIsOn((prev) => !prev)}
        className={`relative inline-flex h-7 w-14 items-center rounded-full border border-surface-border/60 transition ${
          isOn ? 'bg-primary/60' : 'bg-surface-border/60'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isOn ? 'translate-x-7' : 'translate-x-2'}`}
        />
      </button>
    </div>
  );
};

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className={`${sectionHeadingClass} text-3xl`}>Settings</h1>
            <p className={sectionSubtitleClass}>Fine-tune your PythonQuest experience and personalise tutoring assistance.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
            <span className={pillMutedClass}>Profile</span>
            <span className={pillMutedClass}>Preferences</span>
            <span className={pillMutedClass}>Notifications</span>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className={`${panelClass} space-y-5 p-6 sm:p-8`}>
          <div>
            <h2 className={sectionHeadingClass}>Appearance</h2>
            <p className={sectionSubtitleClass}>Keep your workspace comfortable and consistent across devices.</p>
          </div>
          <div className={`${cardClass} space-y-5 p-5`}>
            <Toggle label="Dark Mode" description="Switch between light and dark themes" initialValue />
            <div className="surface-divider" />
            <Toggle label="Sync with system" description="Match the app to your device preference" initialValue />
            <div className="surface-divider" />
            <Toggle label="High contrast" description="Boost contrast for accessibility" />
          </div>
        </article>

        <article className={`${panelClass} space-y-5 p-6 sm:p-8`}>
          <div>
            <h2 className={sectionHeadingClass}>Account & Privacy</h2>
            <p className={sectionSubtitleClass}>Manage your data footprint and export learning history.</p>
          </div>
          <div className={`${cardClass} space-y-5 p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-primary">Privacy Policy</p>
                <p className="text-xs text-ink-muted">Review terms and privacy commitments</p>
              </div>
              <button className={outlineButtonClass}>View policy</button>
            </div>
            <div className="surface-divider" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-primary">Download your data</p>
                <p className="text-xs text-ink-muted">Get a full export of lessons and AI feedback</p>
              </div>
              <button className={outlineButtonClass}>Request export</button>
            </div>
            <div className="surface-divider" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-danger">Delete account</p>
                <p className="text-xs text-ink-muted">This action is permanent and removes all progress</p>
              </div>
              <button className={`${outlineButtonClass} text-danger hover:text-danger`}>Contact support</button>
            </div>
          </div>
        </article>
      </section>

      <section className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className={sectionHeadingClass}>Notification Preferences</h2>
            <p className={sectionSubtitleClass}>Control what updates land in your inbox.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
            <span className={pillMutedClass}>Daily digest</span>
            <span className={pillMutedClass}>Weekly summary</span>
            <span className={pillMutedClass}>Milestones only</span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[ 'Daily streak reminders', 'Lesson completion alerts', 'Leaderboard position changes', 'AI tutor insights' ].map((item) => (
            <div key={item} className={`${cardClass} flex items-center justify-between p-4 text-sm text-ink-secondary`}>
              <span>{item}</span>
              <Toggle label="" description="" initialValue />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
