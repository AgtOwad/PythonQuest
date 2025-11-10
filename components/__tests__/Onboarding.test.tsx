import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Onboarding from '../Onboarding';
import { vi } from 'vitest';

describe('Onboarding', () => {
  it('renders onboarding steps and actions', () => {
    const onOpenAuth = vi.fn();
    const onComplete = vi.fn();

    render(<Onboarding onOpenAuth={onOpenAuth} onComplete={onComplete} />);

    expect(screen.getByText(/Level up Python skills/i)).toBeInTheDocument();
    expect(screen.getByText('Choose Your Python Path')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create your account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I already have an account/i })).toBeInTheDocument();

    const continueButton = screen.getByRole('button', { name: /Continue to sign up/i });
    expect(continueButton).toBeDisabled();

    fireEvent.click(screen.getByRole('radio', { name: /Just getting started/i }));
    fireEvent.click(screen.getByRole('radio', { name: /New career in tech/i }));
    fireEvent.click(screen.getByRole('radio', { name: /15 minutes daily/i }));

    expect(continueButton).not.toBeDisabled();
  });
});
