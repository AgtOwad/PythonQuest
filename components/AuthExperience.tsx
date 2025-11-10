import React, { useCallback, useMemo, useState } from 'react';
import { AUTH_TIPS, ICONS } from '../constants';
import type { AuthVariant } from '../types';
import {
  panelClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  inputShellClass,
  primaryButtonClass,
  pillMutedClass,
} from './ui/primitives';

interface AuthExperienceProps {
  variant: AuthVariant;
  onVariantChange: (variant: AuthVariant) => void;
  onSubmit: (variant: AuthVariant, payload: Record<string, string>) => Promise<void> | void;
  onBackToOnboarding: () => void;
  isProcessing?: boolean;
  message?: string | null;
  error?: string | null;
}

const variantCopy: Record<
  AuthVariant,
  { title: string; subtitle: string; cta: string; link?: { label: string; target: AuthVariant } }
> = {
  login: {
    title: 'Welcome back, trailblazer',
    subtitle: 'Pick up right where you left off—your streak is waiting.',
    cta: 'Log in securely',
    link: { label: 'Need to create an account?', target: 'signup' },
  },
  signup: {
    title: 'Create your PythonQuest account',
    subtitle: 'Customize your roadmap and compete with learners around the globe.',
    cta: 'Create account',
    link: { label: 'Already have an account?', target: 'login' },
  },
  'reset-password': {
    title: 'Reset your access',
    subtitle: 'We’ll send a secure link to help you get back into your account.',
    cta: 'Send reset link',
    link: { label: 'Remember your password?', target: 'login' },
  },
};

const baseFields = {
  email: { label: 'Email address', placeholder: 'you@example.com', type: 'email' },
  password: { label: 'Password', placeholder: '••••••••', type: 'password' },
  name: { label: 'Display name', placeholder: 'Ada Lovelace', type: 'text' },
};

const variantFields: Record<AuthVariant, Array<keyof typeof baseFields>> = {
  login: ['email', 'password'],
  signup: ['name', 'email', 'password'],
  'reset-password': ['email'],
};

const AuthExperience: React.FC<AuthExperienceProps> = ({
  variant,
  onVariantChange,
  onSubmit,
  onBackToOnboarding,
  isProcessing = false,
  message,
  error,
}) => {
  const copy = variantCopy[variant];
  const fields = useMemo(() => variantFields[variant], [variant]);
  const [formValues, setFormValues] = useState<Record<keyof typeof baseFields, string>>({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = useCallback((field: keyof typeof baseFields, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const payload: Record<string, string> = {};
      fields.forEach((fieldKey) => {
        payload[fieldKey] = formValues[fieldKey];
      });
      await onSubmit(variant, payload);
    },
    [fields, formValues, onSubmit, variant],
  );

  return (
    <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <div className={`${panelClass} space-y-6 p-8`}>
        <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>
          {variant === 'signup' ? ICONS.USER_PLUS : variant === 'reset-password' ? ICONS.RESET : ICONS.LOGIN}
          {variant === 'signup' ? 'Join the community' : variant === 'reset-password' ? 'Account recovery' : 'Welcome back'}
        </span>
        <div className="space-y-3">
          <h1 className={`${sectionHeadingClass} text-3xl`}>{copy.title}</h1>
          <p className={sectionSubtitleClass}>{copy.subtitle}</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((fieldKey) => {
            const field = baseFields[fieldKey];
            return (
              <label key={fieldKey} className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{field.label}</span>
                <input
                  className={`${inputShellClass} w-full bg-surface-card/70 placeholder:text-ink-muted/70`}
                  placeholder={field.placeholder}
                  type={field.type}
                  name={fieldKey}
                  value={formValues[fieldKey]}
                  onChange={(event) => handleChange(fieldKey, event.target.value)}
                  disabled={isProcessing}
                />
              </label>
            );
          })}
          {message && (
            <p className="rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">{message}</p>
          )}
          {error && (
            <p className="rounded-2xl border border-warning/50 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</p>
          )}
          <button type="submit" className={primaryButtonClass} disabled={isProcessing}>
            {isProcessing ? 'Submitting…' : copy.cta}
          </button>
        </form>
        <div className="flex flex-col gap-3">
          {copy.link && (
            <button type="button" className="glass-button" onClick={() => onVariantChange(copy.link!.target)}>
              {copy.link.label}
            </button>
          )}
          {variant !== 'reset-password' && (
            <button type="button" className="glass-button" onClick={() => onVariantChange('reset-password')}>
              Trouble signing in?
            </button>
          )}
          <button type="button" className="glass-button" onClick={onBackToOnboarding}>
            Back to onboarding
          </button>
        </div>
      </div>
      <aside className={`${panelClass} space-y-6 p-8`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink-primary">Save time with passkeys</p>
            <p className="text-xs text-ink-muted">Works across desktop and mobile.</p>
          </div>
          <div className="rounded-xl bg-primary/15 p-3 text-primary">{ICONS.SPARK}</div>
        </div>
        <div className="space-y-3 text-sm text-ink-secondary">
          {AUTH_TIPS.map((tip) => (
            <p key={tip} className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface-border/40 text-primary">
                {ICONS.CHECK}
              </span>
              <span>{tip}</span>
            </p>
          ))}
        </div>
        <div className="rounded-2xl border border-dashed border-surface-border/70 p-5 text-sm text-ink-muted">
          Enable two-factor authentication once you are signed in to protect your streak.
        </div>
      </aside>
    </section>
  );
};

export default AuthExperience;
