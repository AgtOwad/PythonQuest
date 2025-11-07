import React from 'react';
import { ACHIEVEMENT_CARD, ICONS } from '../constants';
import { panelClass, cardClass, pillMutedClass, primaryButtonClass, ghostButtonClass, sectionHeadingClass } from './ui/primitives';

const AchievementShare: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8`}>
    <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.SHARE} Share your win</span>
    <div className={`${cardClass} space-y-5 p-8 text-center`}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/15 text-primary">
        {ICONS.TROPHY}
      </div>
      <div className="space-y-2">
        <h1 className={`${sectionHeadingClass} text-3xl`}>{ACHIEVEMENT_CARD.title}</h1>
        <p className="text-sm text-ink-secondary">{ACHIEVEMENT_CARD.description}</p>
      </div>
      <p className="text-sm font-semibold text-primary">{ACHIEVEMENT_CARD.reward}</p>
      <p className="rounded-2xl bg-surface-card/40 p-4 text-sm text-ink-secondary">{ACHIEVEMENT_CARD.shareCopy}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button className={primaryButtonClass}>Share to community</button>
        <button className={ghostButtonClass}>Copy link</button>
      </div>
    </div>
  </section>
);

export default AchievementShare;
