import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardComponent from '../../components/pages/dashboard/DashboardComponent';

describe('DashboardComponent', () => {
  test('renders Dashboard page content', () => {
    render(<DashboardComponent />);
    const dashboardText = screen.getByText(/Dashboard/i);
    expect(dashboardText).toBeInTheDocument();
  });
});
