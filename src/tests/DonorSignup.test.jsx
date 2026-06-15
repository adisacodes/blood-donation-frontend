import { render, screen } from '@testing-library/react';
import DonorSignup from '../pages/auth/DonorSignup';

describe('Donor Signup Page', () => {
  test('renders donor registration heading', () => {
    render(<DonorSignup />);

    expect(
      screen.getByText(/donor registration/i)
    ).toBeInTheDocument();
  });

  test('renders all donor form fields', () => {
    render(<DonorSignup />);

    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
  });

  test('renders register button', () => {
    render(<DonorSignup />);

    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });
});