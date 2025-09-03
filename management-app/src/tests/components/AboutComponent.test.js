import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutComponent from '../../components/pages/about/AboutComponent';

describe('AboutComponent', () => {
  test('renders About page content', () => {
    render(<AboutComponent />);
    const aboutText = screen.getByText(/About/i);
    expect(aboutText).toBeInTheDocument();
  });
});
