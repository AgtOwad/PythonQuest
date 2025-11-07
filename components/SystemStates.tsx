import React from 'react';
import {
  NOTIFICATIONS_FEED,
  OFFLINE_GUIDE,
  ERROR_HELP,
  HINT_PLAYBOOK,
  LOADING_SKELETONS,
  EMPTY_STATE_GUIDE,
  ICONS,
} from '../constants';
import {
  panelClass,
  cardClass,
  pillMutedClass,
  primaryButtonClass,
  ghostButtonClass,
  sectionHeadingClass,
  sectionSubtitleClass,
} from './ui/primitives';

export const NotificationsScreen: React.FC = () => (
  <section className="space-y-8">
    <header className="space-y-3">
      <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>
        {ICONS.BELL} Inbox
      </span>
      <h1 className={`${sectionHeadingClass} text-3xl`}>Stay in sync with your learning universe</h1>
      <p className={sectionSubtitleClass}>
        Track quest progress, event invites, and system alerts in one place. Alerts update live as you conquer Python goals.
      </p>
    </header>
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className={`${panelClass} space-y-4 p-6`}>
        {NOTIFICATIONS_FEED.map((item) => (
          <article key={item.id} className={`${cardClass} flex items-start justify-between gap-4 border-transparent bg-surface-card/40 p-5`}>
            <div className="flex items-start gap-4">
              <span
                className={`mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                  item.tone === 'success'
                    ? 'bg-success/20 text-success'
                    : item.tone === 'promo'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-warning/20 text-warning'
                }`}
              >
                {item.tone === 'success' ? ICONS.CHECK : item.tone === 'promo' ? ICONS.SPARK : ICONS.WARNING}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink-primary">{item.title}</p>
                <p className="text-sm text-ink-secondary">{item.message}</p>
                <p className="text-xs text-ink-muted">{item.time}</p>
              </div>
            </div>
            <button className="glass-button text-xs">View</button>
          </article>
        ))}
      </div>
      <aside className={`${panelClass} space-y-6 p-6`}>
        <h2 className="text-lg font-semibold text-ink-primary">Smart filters</h2>
        <div className="flex flex-wrap gap-2">
          <button className={primaryButtonClass}>All</button>
          <button className="glass-button">Quests</button>
          <button className="glass-button">System</button>
          <button className="glass-button">Community</button>
        </div>
        <div className={`${cardClass} space-y-2 bg-surface-card/40 p-5 text-sm text-ink-secondary`}>
          <p className="font-semibold text-ink-primary">Quiet hours</p>
          <p>Mute push notifications overnight to keep focus.</p>
          <button className="glass-button">Schedule quiet hours</button>
        </div>
      </aside>
    </div>
  </section>
);

export const OfflineScreen: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8`}>
    <span className={`${pillMutedClass} inline-flex items-center gap-2 text-warning`}>{ICONS.WIFI_OFF} Offline mode</span>
    <div className="space-y-3">
      <h1 className={`${sectionHeadingClass} text-3xl`}>{OFFLINE_GUIDE.title}</h1>
      <p className={sectionSubtitleClass}>{OFFLINE_GUIDE.description}</p>
    </div>
    <ul className="space-y-3 text-sm text-ink-secondary">
      {OFFLINE_GUIDE.checklist.map((tip) => (
        <li key={tip} className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-surface-card/60 text-primary">
            {ICONS.CHECK}
          </span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-3">
      <button className={primaryButtonClass}>Retry connection</button>
      <button className="glass-button">Download offline pack</button>
    </div>
  </section>
);

export const ErrorScreen: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8`}>
    <span className={`${pillMutedClass} inline-flex items-center gap-2 text-warning`}>{ICONS.WARNING} Service notice</span>
    <div className="space-y-3">
      <h1 className={`${sectionHeadingClass} text-3xl`}>{ERROR_HELP.title}</h1>
      <p className={sectionSubtitleClass}>{ERROR_HELP.description}</p>
    </div>
    <div className="grid gap-3 md:grid-cols-3">
      {ERROR_HELP.steps.map((step) => (
        <div key={step} className={`${cardClass} space-y-2 p-5 text-sm text-ink-secondary`}>
          <p className="text-sm font-semibold text-ink-primary">{step}</p>
          <p>We’ll keep an eye on the servers and resume your streak when resolved.</p>
        </div>
      ))}
    </div>
    <button className={ghostButtonClass}>Contact support</button>
  </section>
);

export const HintScreen: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8`}>
    <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.HINT} Hint unlocked</span>
    <div className="space-y-3">
      <h1 className={`${sectionHeadingClass} text-3xl`}>{HINT_PLAYBOOK.title}</h1>
      <p className={sectionSubtitleClass}>{HINT_PLAYBOOK.framing}</p>
    </div>
    <ul className="space-y-3 text-sm text-ink-secondary">
      {HINT_PLAYBOOK.tactics.map((tactic) => (
        <li key={tactic} className={`${cardClass} flex items-center gap-3 p-5`}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            {ICONS.CHECK}
          </span>
          <span>{tactic}</span>
        </li>
      ))}
    </ul>
    <div className={`${cardClass} p-5 text-sm text-ink-secondary`}>{HINT_PLAYBOOK.additionalHelp}</div>
  </section>
);

export const LoadingScreen: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8`}>
    <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.LOADER} Preparing your run</span>
    <div className="space-y-3">
      <h1 className={`${sectionHeadingClass} text-3xl`}>Setting up your workspace</h1>
      <p className={sectionSubtitleClass}>
        Hang tight while we pull in your personalized lessons, resume editor state, and warm up the AI mentor.
      </p>
    </div>
    <div className="space-y-3">
      {LOADING_SKELETONS.map((item, index) => (
        <div key={item.id} className={`${cardClass} space-y-2 p-5`}>
          <div className="flex items-center justify-between text-sm text-ink-muted">
            <span>{item.label}</span>
            <span>{index * 15 + 30}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-border/40">
            <span className="block h-full w-2/3 animate-pulse rounded-full bg-primary/30"></span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const EmptyStateScreen: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8 text-center`}>
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/15 text-primary">
      {ICONS.BOXES}
    </div>
    <div className="space-y-3">
      <h1 className={`${sectionHeadingClass} text-3xl`}>{EMPTY_STATE_GUIDE.title}</h1>
      <p className={sectionSubtitleClass}>{EMPTY_STATE_GUIDE.description}</p>
    </div>
    <button className={primaryButtonClass}>{EMPTY_STATE_GUIDE.cta}</button>
    <p className="text-sm text-ink-muted">{EMPTY_STATE_GUIDE.helper}</p>
  </section>
);
