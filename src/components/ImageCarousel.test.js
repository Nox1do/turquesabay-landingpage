import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import ImageCarousel from './ImageCarousel';

test('filters the gallery and shows the matching image count', () => {
  render(<ImageCarousel />);
  fireEvent.click(screen.getByRole('button', { name: 'Details' }));
  expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText('01 / 02')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
  expect(screen.getByText('02 / 02')).toBeInTheDocument();
});

test('full-screen gallery supports arrows, focus trapping and Escape', async () => {
  render(<ImageCarousel />);
  const opener = screen.getByRole('button', { name: 'Open photo full screen' });
  opener.focus();
  fireEvent.click(opener);
  const dialog = screen.getByRole('dialog', { name: 'TurquesaBay photo gallery' });
  expect(dialog.parentElement).toBe(document.body);
  expect(screen.getByRole('button', { name: 'Close gallery' })).toHaveFocus();
  fireEvent.keyDown(dialog, { key: 'ArrowRight' });
  expect(within(dialog).getByText('02 / 07')).toBeInTheDocument();
  fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
  expect(within(dialog).getByText('01 / 07')).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
  expect(within(dialog).getByRole('button', { name: 'Next photo' })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(opener).toHaveFocus();
  expect(document.body.style.overflow).not.toBe('hidden');
});

test('swiping changes the photo and a failed image leaves controls usable', () => {
  render(<ImageCarousel />);
  const opener = screen.getByRole('button', { name: 'Open photo full screen' });
  fireEvent.touchStart(opener, { touches: [{ clientX: 220, clientY: 50 }] });
  fireEvent.touchEnd(opener, { changedTouches: [{ clientX: 100, clientY: 55 }] });
  expect(screen.getByText('02 / 07')).toBeInTheDocument();
  fireEvent.error(within(opener).getByRole('img'));
  expect(screen.getByText('Photo unavailable')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
  expect(screen.getByText('03 / 07')).toBeInTheDocument();
});
