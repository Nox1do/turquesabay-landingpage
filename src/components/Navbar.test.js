import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('visit CTA navigates to contact and marks the current route', () => {
  render(<MemoryRouter initialEntries={['/contact']}><Navbar /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'Schedule a visit' })).toHaveAttribute('href', '/contact');
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');
});

test('mobile menu closes on Escape and restores the toggle focus', async () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  const toggle = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(document.getElementById(toggle.getAttribute('aria-controls'))).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'false'));
  expect(toggle).toHaveFocus();
});

test('choosing a mobile route dismisses the menu', async () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  const menu = document.getElementById('mobile-menu');
  fireEvent.click(within(menu).getByRole('link', { name: 'Contact' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false'));
});
