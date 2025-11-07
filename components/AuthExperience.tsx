import React, { useMemo } from 'react';
import { AUTH_TIPS, ICONS } from '../constants';
import { View } from '../types';
import {
  panelClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  inputShellClass,
  primaryButtonClass,
  pillMutedClass,
} from './ui/primitives';

type AuthVariant = 'login' | 'signup' | 'reset-password';

interface AuthExperienceProps {
  variant: AuthVariant;
  onNavigate: (view: View) => void;
}

const variantCopy: Record<AuthVariant, { title: string; subtitle: string; cta: string; link?: { label: string; target: View } }> = {
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

const AuthExperience: React.FC<AuthExperienceProps> = ({ variant, onNavigate }) => {
  const copy = variantCopy[variant];
  const fields = useMemo(() => variantFields[variant], [variant]);

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
        <form className="space-y-4">
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
                />
              </label>
            );
          })}
          <button type="submit" className={primaryButtonClass}>
            {copy.cta}
          </button>
        </form>
        {copy.link && (
          <button
            type="button"
            className="glass-button"
            onClick={() => onNavigate(copy.link!.target)}
          >
            {copy.link.label}
          </button>
        )}
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
          Enable two-factor authentication in{' '}
          <button
            type="button"
            className="font-semibold text-primary underline"
            onClick={() => onNavigate('settings')}
          >
            settings
          </button>{' '}
          to protect your streak.
        </div>
      </aside>
    </section>
  );
};

export default AuthExperience;
