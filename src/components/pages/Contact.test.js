import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

jest.mock('@emailjs/browser', () => ({ send: jest.fn() }));

const renderContact = (entry = '/contact') => render(<MemoryRouter initialEntries={[entry]}><Contact /></MemoryRouter>);
const fillForm = () => {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test visitor' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'visitor@example.com' } });
  fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Schedule a visit' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'I would like to explore a residence.' } });
};
beforeEach(() => emailjs.send.mockReset());

test('shows the form immediately and associates validation errors with fields', () => {
  renderContact();
  expect(screen.queryByTitle('Loading animation')).not.toBeInTheDocument();
  const form = screen.getByRole('form', { name: 'Enquire about TurquesaBay' });
  fireEvent.submit(form);
  expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByLabelText('Name')).toHaveAccessibleDescription('Name is required');
  expect(screen.getByLabelText('Name')).toHaveFocus();
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('locks rapid duplicate submissions until success, then clears the form', async () => {
  let resolve;
  emailjs.send.mockImplementation(() => new Promise((done) => { resolve = done; }));
  renderContact();
  fillForm();
  const form = screen.getByRole('form', { name: 'Enquire about TurquesaBay' });
  act(() => { fireEvent.submit(form); fireEvent.submit(form); });
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Sending message…' })).toBeDisabled();
  await act(async () => resolve({ text: 'OK' }));
  expect(screen.getByRole('status')).toHaveTextContent('Message sent successfully');
  expect(screen.getByLabelText('Name')).toHaveValue('');
  expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
});

test('keeps input after a failed send and permits a retry', async () => {
  emailjs.send.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ text: 'OK' });
  renderContact();
  fillForm();
  fireEvent.submit(screen.getByRole('form', { name: 'Enquire about TurquesaBay' }));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Could not send'));
  expect(screen.getByLabelText('Name')).toHaveValue('Test visitor');
  expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  fireEvent.submit(screen.getByRole('form', { name: 'Enquire about TurquesaBay' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Message sent successfully'));
  expect(emailjs.send).toHaveBeenCalledTimes(2);
});

test('prefills a visit enquiry from the CTA query', () => {
  renderContact('/contact?subject=Schedule%20a%20visit');
  expect(screen.getByLabelText('Subject')).toHaveValue('Schedule a visit');
});
