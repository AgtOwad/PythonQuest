import React, { useCallback, useMemo, useState } from 'react';
import { ONBOARDING_STEPS, AUTH_TIPS, ICONS } from '../constants';
import {
  primaryButtonClass,
  cardClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  pillMutedClass,
  labelMutedClass,
} from './ui/primitives';
import type { AuthVariant, OnboardingPreferences } from '../types';

interface OptionItem {
  value: string;
  label: string;
  description: string;
}

const experienceOptions: OptionItem[] = [
  { value: 'beginner', label: 'Just getting started', description: 'No prior Python experience yet.' },
  { value: 'intermediate', label: 'Comfortable with basics', description: 'I can write scripts and small utilities.' },
  { value: 'advanced', label: 'Shipping projects already', description: 'Looking to master advanced concepts.' },
];

const goalOptions: OptionItem[] = [
  { value: 'career-switch', label: 'New career in tech', description: 'Land a junior developer role this year.' },
  { value: 'upskill', label: 'Advance my current role', description: 'Automate workflows and analyze data faster.' },
  { value: 'hobby', label: 'Personal mastery', description: 'Build projects for fun and sharpen problem-solving.' },
];

const cadenceOptions: OptionItem[] = [
  { value: 'daily-15', label: '15 minutes daily', description: 'Short bursts to keep the streak alive.' },
  { value: 'daily-30', label: '30 minutes daily', description: 'Balanced practice with time for reviews.' },
  { value: 'weekend-sprints', label: 'Weekend sprints', description: 'Longer deep-dives during the weekend.' },
];

interface OnboardingProps {
  onOpenAuth: (variant: AuthVariant) => void;
  onComplete: (preferences: OnboardingPreferences) => Promise<void> | void;
  isSubmitting?: boolean;
  message?: string | null;
  error?: string | null;
}

const Onboarding: React.FC<OnboardingProps> = ({ onOpenAuth, onComplete, isSubmitting = false, message, error }) => {
  const [preferences, setPreferences] = useState<OnboardingPreferences>({ experience: '', goal: '', cadence: '' });
  const [submitted, setSubmitted] = useState(false);

  const isComplete = useMemo(
    () => Boolean(preferences.experience && preferences.goal && preferences.cadence),
    [preferences],
  );

  const handleSelection = useCallback(
    (field: keyof OnboardingPreferences, value: string) => {
      setPreferences((prev) => ({ ...prev, [field]: value }));
      setSubmitted(false);
    },
    [],
  );

  const renderOptions = useCallback(
    (field: keyof OnboardingPreferences, label: string, options: OptionItem[]) => (
      <fieldset className="space-y-3" key={field}>
        <legend className={labelMutedClass}>{label}</legend>
        <div className="space-y-2">
          {options.map((option) => {
            const isActive = preferences[field] === option.value;
            return (
              <label
                key={option.value}
                className={`${cardClass} cursor-pointer border transition focus-within:border-primary focus-within:text-ink-primary ${
                  isActive ? 'border-primary bg-primary/10 text-ink-primary shadow-elevation-1' : 'bg-surface-card/70 text-ink-secondary'
                }`}
              >
                <input
                  type="radio"
                  name={field}
                  value={option.value}
                  checked={isActive}
                  onChange={() => handleSelection(field, option.value)}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <div className="space-y-1 p-4">
                  <p className="text-sm font-semibold text-ink-primary">{option.label}</p>
                  <p className="text-xs text-ink-muted">{option.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>
    ),
    [handleSelection, isSubmitting, preferences],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isComplete || isSubmitting) {
        return;
      }

      try {
        await onComplete(preferences);
        setSubmitted(true);
      } catch (submissionError) {
        console.error('Onboarding submission failed', submissionError);
      }
    },
    [isComplete, isSubmitting, onComplete, preferences],
  );

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
          <div className="hidden shrink-0 rounded-2xl bg-primary/15 p-4 text-primary md:flex">{ICONS.PYTHON}</div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className={primaryButtonClass} onClick={() => onOpenAuth('signup')}>
            Create your account
          </button>
          <button className="glass-button" onClick={() => onOpenAuth('login')}>
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

      <form onSubmit={handleSubmit} className={`${cardClass} space-y-6 p-6`}>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-ink-primary">Tailor your roadmap</h2>
          <p className="text-sm text-ink-secondary">
            Choose the options that best describe you. We’ll use them to calibrate lessons, difficulty, and reminders.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {renderOptions('experience', 'Your experience', experienceOptions)}
          {renderOptions('goal', 'Primary motivation', goalOptions)}
          {renderOptions('cadence', 'Preferred cadence', cadenceOptions)}
        </div>

        <div className="space-y-3">
          {message && (
            <p className="rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">{message}</p>
          )}
          {error && (
            <p className="rounded-2xl border border-warning/50 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className={primaryButtonClass} disabled={!isComplete || isSubmitting}>
            {isSubmitting ? 'Saving preferences…' : submitted ? 'Preferences saved' : 'Continue to sign up'}
          </button>
          <button type="button" className="glass-button" onClick={() => onOpenAuth('signup')}>
            Skip and create account
          </button>
        </div>
      </form>

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
