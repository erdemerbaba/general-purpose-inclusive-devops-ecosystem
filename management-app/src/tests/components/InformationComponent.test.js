import React from 'react';
import { render, screen } from '@testing-library/react';
import InformationComponent from '../../components/pages/information/InformationComponent';

describe('InformationComponent', () => {
  test('renders Information page content', () => {
    render(<InformationComponent />);
    const informationText = screen.getByText(/Information/i);
    expect(informationText).toBeInTheDocument();
  });
});
