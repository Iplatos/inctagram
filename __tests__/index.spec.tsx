import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
jest.mock('next/router', () => require('next-router-mock'));

const TEST_STRING = 'TEST_STRING';

describe('Home', () => {
  it('renders a heading', () => {
    render(<h1>{TEST_STRING}</h1>);

    const heading = screen.getByRole('heading', {
      name: /TEST_STRING/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
