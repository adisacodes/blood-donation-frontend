import { render, screen } from '@testing-library/react';
import HospitalSignup from '../pages/auth/HospitalSignup';

describe('Hospital Signup Page', () => {
  test('renders hospital registration heading', () => {
    render(<HospitalSignup />);

    expect(
      screen.getByText(/hospital registration/i)
    ).toBeInTheDocument();
  });

  test('renders all hospital form fields', () => {
    render(<HospitalSignup />);

    expect(screen.getByPlaceholderText(/hospital name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/license number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contact person/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
  });

  test('renders hospital register button', () => {
    render(<HospitalSignup />);

    expect(
      screen.getByRole('button', { name: /register hospital/i })
    ).toBeInTheDocument();
  });
});