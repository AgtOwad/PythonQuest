import React from 'react';
import { QUIZ_PROMPTS, RESULTS_SUMMARY, ICONS } from '../constants';
import {
  panelClass,
  cardClass,
  pillMutedClass,
  primaryButtonClass,
  ghostButtonClass,
  sectionHeadingClass,
  sectionSubtitleClass,
} from './ui/primitives';

export const QuizScreen: React.FC = () => (
  <section className="space-y-8">
    <header className="space-y-3">
      <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.QUIZ} Quiz mode</span>
      <h1 className={`${sectionHeadingClass} text-3xl`}>Python Fundamentals Checkpoint</h1>
      <p className={sectionSubtitleClass}>
        Answer the questions below to boost your streak and unlock the Control Flow mastery path.
      </p>
    </header>
    <div className={`${panelClass} space-y-6 p-8`}>
      {QUIZ_PROMPTS.map((prompt, index) => (
        <article key={prompt.id} className={`${cardClass} space-y-4 p-6`}>
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Question {index + 1}</p>
              <h2 className="text-lg font-semibold text-ink-primary">{prompt.question}</h2>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">+20 XP</span>
          </header>
          <div className="grid gap-2 md:grid-cols-2">
            {prompt.options.map((option, optionIndex) => (
              <button
                key={option}
                className={`${cardClass} flex items-center gap-3 border border-transparent bg-surface-card/50 px-4 py-3 text-left text-sm text-ink-secondary transition hover:border-primary hover:text-ink-primary`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-border/40 text-ink-muted">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </article>
      ))}
      <div className="flex flex-wrap justify-end gap-3">
        <button className={ghostButtonClass}>Review hints</button>
        <button className={primaryButtonClass}>Submit answers</button>
      </div>
    </div>
  </section>
);

export const ResultsScreen: React.FC = () => (
  <section className={`${panelClass} space-y-6 p-8`}>
    <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.TROPHY} Results</span>
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className={`${cardClass} flex-1 space-y-4 p-6 text-center`}> 
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Score</p>
        <p className="text-5xl font-bold text-primary">{RESULTS_SUMMARY.score}%</p>
        <p className="text-sm text-ink-secondary">{RESULTS_SUMMARY.streakBonus}</p>
      </div>
      <div className={`${cardClass} flex-1 space-y-4 p-6`}>
        <h2 className="text-lg font-semibold text-ink-primary">Highlights</h2>
        <ul className="space-y-2 text-sm text-ink-secondary">
          {RESULTS_SUMMARY.highlights.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                {ICONS.CHECK}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className={`${cardClass} space-y-3 p-6`}>
      <h2 className="text-lg font-semibold text-ink-primary">Next steps</h2>
      <div className="flex flex-wrap gap-3">
        {RESULTS_SUMMARY.actions.map((action) => (
          <button key={action} className="glass-button">{action}</button>
        ))}
      </div>
    </div>
  </section>
);
