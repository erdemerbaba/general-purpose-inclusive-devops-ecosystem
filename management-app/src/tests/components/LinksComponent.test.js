import React from 'react';
import { render, screen } from '@testing-library/react';
import LinksComponent from '../../components/pages/links/LinksComponent';

describe('LinksComponent', () => {
  test('renders Links page content', () => {
    render(<LinksComponent />);
    const linksText = screen.getByText(/Links/i);
    expect(linksText).toBeInTheDocument();
  });
});
