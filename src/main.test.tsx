import { render, screen } from '@testing-library/react';
import App from './main';

test('renders learn react link', () => {
  render(<App />);
  const tabElement = screen.getByText(/Subscription Options/i);
  expect(tabElement).toBeInTheDocument();
});
