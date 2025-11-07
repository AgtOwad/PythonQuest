import React from 'react';
import { PROJECT_BLUEPRINT, ICONS } from '../constants';
import { panelClass, cardClass, pillMutedClass, primaryButtonClass, ghostButtonClass, sectionHeadingClass, sectionSubtitleClass } from './ui/primitives';

const ProjectShowcase: React.FC = () => (
  <section className="space-y-8">
    <header className="space-y-3">
      <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.PROJECT} Guided project</span>
      <h1 className={`${sectionHeadingClass} text-3xl`}>{PROJECT_BLUEPRINT.title}</h1>
      <p className={sectionSubtitleClass}>{PROJECT_BLUEPRINT.summary}</p>
    </header>
    <div className={`${panelClass} space-y-6 p-8`}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className={`${cardClass} space-y-3 p-6`}>
          <h2 className="text-lg font-semibold text-ink-primary">Checkpoints</h2>
          <ul className="space-y-3 text-sm text-ink-secondary">
            {PROJECT_BLUEPRINT.checkpoints.map((checkpoint) => (
              <li key={checkpoint} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  {ICONS.CHECK}
                </span>
                <span>{checkpoint}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${cardClass} space-y-3 p-6`}>
          <h2 className="text-lg font-semibold text-ink-primary">Mentor tips</h2>
          <ul className="space-y-3 text-sm text-ink-secondary">
            {PROJECT_BLUEPRINT.mentorTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-border/40 text-ink-muted">
                  {ICONS.SPARK}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-3">
        <button className={ghostButtonClass}>Preview template</button>
        <button className={primaryButtonClass}>Start project</button>
      </div>
    </div>
  </section>
);

export default ProjectShowcase;
