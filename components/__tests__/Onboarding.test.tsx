import React from 'react';
import { render, screen } from '@testing-library/react';
import Onboarding from '../Onboarding';

describe('Onboarding', () => {
  it('renders onboarding steps and actions', () => {
    render(<Onboarding onNavigate={() => undefined} />);

    expect(screen.getByText(/Level up Python skills/i)).toBeInTheDocument();
    expect(screen.getByText('Choose Your Python Path')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start onboarding/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I already have an account/i })).toBeInTheDocument();
  });
});
