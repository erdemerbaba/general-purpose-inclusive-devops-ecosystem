import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileComponent from '../../components/pages/profile/ProfileComponent';

describe('ProfileComponent', () => {
  test('renders Profile page content', () => {
    render(<ProfileComponent />);
    const profileText = screen.getByText(/Profile/i);
    expect(profileText).toBeInTheDocument();
  });
});
