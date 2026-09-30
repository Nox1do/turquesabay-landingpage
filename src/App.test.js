import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the primary page links while initial content loads', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);

  try {
    expect(screen.getByRole('link', { name: 'Home page' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'View our amenities' })).toHaveAttribute('href', '/amenities');
    expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '/contact');
    expect(screen.getByTitle('Loading animation')).toBeInTheDocument();
  } finally {
    unmount();
    jest.clearAllTimers();
    jest.useRealTimers();
  }
});
