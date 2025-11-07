import React from 'react';
import { ONBOARDING_STEPS, AUTH_TIPS, ICONS } from '../constants';
import { primaryButtonClass, cardClass, sectionHeadingClass, sectionSubtitleClass, pillMutedClass } from './ui/primitives';
import { View } from '../types';

interface OnboardingProps {
  onNavigate: (view: View) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onNavigate }) => {
  return (
    <section className="space-y-8">
      <header className={`${cardClass} flex flex-col gap-4 p-8`}> 
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.SPARK} Welcome Aboard</span>
            <h1 className={`${sectionHeadingClass} text-3xl`}>Level up Python skills on your terms</h1>
            <p className={sectionSubtitleClass}>
              Answer a few quick questions to personalize your roadmap, unlock curated quests, and get matched with the right
              mentor moments.
            </p>
          </div>
          <div className="hidden shrink-0 rounded-2xl bg-primary/15 p-4 text-primary md:flex">
            {ICONS.PYTHON}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className={primaryButtonClass} onClick={() => onNavigate('signup')}>
            Start onboarding
          </button>
          <button className="glass-button" onClick={() => onNavigate('login')}>
            I already have an account
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {ONBOARDING_STEPS.map((step) => (
          <article key={step.id} className={`${cardClass} flex h-full flex-col gap-4 p-6`}>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-primary">
              <span>{step.badge}</span>
              <span className="text-ink-muted">Step {step.id}</span>
            </div>
            <h2 className="text-lg font-semibold text-ink-primary">{step.title}</h2>
            <p className="text-sm text-ink-secondary">{step.description}</p>
            <div className="mt-auto space-y-2 text-sm text-ink-muted">
              {step.highlights.map((highlight) => (
                <p key={highlight} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    {ICONS.CHECK}
                  </span>
                  {highlight}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <aside className={`${cardClass} grid gap-6 p-6 md:grid-cols-[1fr_0.6fr]`}>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-ink-primary">Sign in faster, stay secure</h2>
          <p className="text-sm text-ink-secondary">
            Turn on passkeys and MFA to keep your streak safe wherever you code. We only use your preferences to improve your
            learning journey.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-ink-secondary">
          {AUTH_TIPS.map((tip) => (
            <li key={tip} className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface-border/40 text-primary">
                {ICONS.SPARK}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default Onboarding;
