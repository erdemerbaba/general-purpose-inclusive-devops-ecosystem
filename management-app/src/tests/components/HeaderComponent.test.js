import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderComponent from '../../components/layout/HeaderComponent';

describe('HeaderComponent', () => {
  test('renders the logo with correct alt text', () => {
    render(<HeaderComponent />);
    const logoElement = screen.getByAltText('eratechnology Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders the Dashboard tab', () => {
    render(<HeaderComponent />);
    const dashboardTab = screen.getByText('Dashboard');
    expect(dashboardTab).toBeInTheDocument();
    expect(dashboardTab).toHaveAttribute('href', '/dashboard');
  });

  test('renders the Profile action icon', () => {
    render(<HeaderComponent />);
    const profileIcon = screen.getByTitle('Profile');
    expect(profileIcon).toBeInTheDocument();
    expect(profileIcon).toHaveAttribute('href', '/profile');
  });

  test('renders the Logout action icon', () => {
    render(<HeaderComponent />);
    const logoutIcon = screen.getByTitle('Logout');
    expect(logoutIcon).toBeInTheDocument();
    expect(logoutIcon).toHaveAttribute('href', '/logout');
  });
});
