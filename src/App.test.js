import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the hero and primary links without an artificial loading screen', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Home page' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'View our amenities' })).toHaveAttribute('href', '/amenities');
    expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A slower pace.');
    expect(screen.queryByTitle('Loading animation')).not.toBeInTheDocument();
});

test('video dialog traps keyboard focus and restores its opener after Escape', async () => {
  render(<App />);
  const opener = screen.getByRole('button', { name: 'Watch the film' });
  opener.focus();
  fireEvent.click(opener);
  const close = screen.getByRole('button', { name: 'Close video' });
  const player = screen.getByRole('link', { name: 'Play film on YouTube' });
  expect(player).toHaveAttribute('href', 'https://www.youtube.com/watch?v=mpuasMTSbTU');
  expect(screen.getByRole('dialog', { name: 'TurquesaBay film' })).toBeInTheDocument();
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
  expect(player).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(opener).toHaveFocus();
  expect(document.body.style.overflow).not.toBe('hidden');
});
