import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Notification from '../assets/Notification';
import { FaArrowRight, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { CONTACT_PHONE } from './home/homeContent';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const FIELDS = [
  { name: 'name', label: 'Name', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', placeholder: 'you@example.com', autoComplete: 'email', type: 'email' },
  { name: 'subject', label: 'Subject', placeholder: 'What would you like to explore?' },
  { name: 'message', label: 'Message', placeholder: 'Tell us about the residence or visit you have in mind.', multiline: true },
];
const MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78178.60200827541!2d-69.61468943408546!3d19.20625671902215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaeff7e40e4fc13%3A0x2d03588e9c980382!2sTurquesa%20bay!5e0!3m2!1sen!2sdo!4v1727051055548!5m2!1sen!2sdo';

function Contact() {
  const [params] = useSearchParams();
  const [formData, setFormData] = useState(() => ({ ...EMPTY_FORM, subject: params.get('subject') || '' }));
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ visible: false, message: '', type: 'success' });
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const mounted = useRef(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const nextErrors = {};
    FIELDS.forEach(({ name, label }) => { if (!formData[name].trim()) nextErrors[name] = `${label} is required`; });
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    sendingRef.current = true;
    setSending(true);
    setNotification((previous) => ({ ...previous, visible: false }));
    try {
      await emailjs.send('service_f5pnbwy', 'template_8khwjj3', {
        from_name: formData.name.trim(), from_email: formData.email.trim(),
        subject: formData.subject.trim(), message: formData.message.trim(),
      }, 'iW3gI3yUtf2gVC4O-');
      if (mounted.current) {
        setNotification({ visible: true, type: 'success', message: 'Message sent successfully. Thank you for contacting TurquesaBay.' });
        setFormData({ ...EMPTY_FORM });
      }
    } catch {
      if (mounted.current) setNotification({ visible: true, type: 'error', message: 'Could not send your message. Your details are saved in this form; please try again or contact us by phone.' });
    } finally {
      sendingRef.current = false;
      if (mounted.current) setSending(false);
    }
  };

  return (
    <section className="bg-[#fbfaf7] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} className="mb-12 max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">Start a conversation</p>
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-teal-950 sm:text-6xl">Your next chapter<br /><span className="italic text-[#9b6f30]">starts here.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">Ask about our residences, explore the floor plans, or arrange a visit. Our team is here to help you find your place in Samaná.</p>
        </motion.div>
        <div className="grid items-start gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
          <div className="overflow-hidden rounded-2xl bg-[#0b3632] text-white">
            <img src="/images/terrace.webp" alt="Open-air seating among tropical palms" width="1600" height="1067" className="h-52 w-full object-cover sm:h-64" />
            <div className="p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-2xl">Let's talk about your visit.</h2>
              <div className="space-y-6 text-sm">
                <a href={CONTACT_PHONE.href} className="flex min-h-11 items-center gap-4 text-white hover:text-[#eeb95d]"><FaPhone className="shrink-0 text-[#eeb95d]" /><span><span className="mb-1 block text-xs text-white/65">Call our team</span>{CONTACT_PHONE.display}</span></a>
                <a href="mailto:turquesabayrd@gmail.com" className="flex min-h-11 items-center gap-4 text-white hover:text-[#eeb95d]"><FaEnvelope className="shrink-0 text-[#eeb95d]" /><span className="min-w-0 break-all"><span className="mb-1 block text-xs text-white/65">Email</span>turquesabayrd@gmail.com</span></a>
                <a href="https://api.whatsapp.com/send?phone=18294232020" target="_blank" rel="noopener noreferrer" className="action-button w-full border border-white/25 px-5 py-3 text-sm text-white hover:bg-white/10"><FaWhatsapp size={20} />Chat on WhatsApp<FaArrowRight size={12} /></a>
                <p className="border-t border-white/15 pt-5 text-xs leading-relaxed text-white/70">Reception office · Santo Domingo, Dominican Republic<br />Monday–Friday · 9:00 AM–5:00 PM</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm sm:p-9">
            <h2 className="font-serif text-2xl text-teal-950 sm:text-3xl">Tell us what you have in mind.</h2>
            <p className="mb-8 mt-3 text-sm text-slate-500">All fields are required.</p>
            <form aria-label="Enquire about TurquesaBay" aria-busy={sending} onSubmit={handleSubmit} noValidate className="space-y-5">
              {FIELDS.map((field) => {
                const Element = field.multiline ? 'textarea' : 'input';
                return <div key={field.name}>
                  <label htmlFor={`contact-${field.name}`} className="mb-2 block text-sm font-semibold text-teal-950">{field.label}</label>
                  <Element id={`contact-${field.name}`} name={field.name} type={field.multiline ? undefined : field.type || 'text'} rows={field.multiline ? 5 : undefined} autoComplete={field.autoComplete} value={formData[field.name]} onChange={handleChange} disabled={sending} required aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} placeholder={field.placeholder} className={`w-full rounded-xl border bg-[#fbfaf7] px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 disabled:opacity-65 ${errors[field.name] ? 'border-red-500' : 'border-teal-900/15'}`} />
                  {errors[field.name] && <p id={`error-${field.name}`} className="mt-2 text-sm text-red-700">{errors[field.name]}</p>}
                </div>;
              })}
              <button type="submit" disabled={sending} className="action-button w-full bg-teal-900 px-6 py-4 text-sm text-white hover:bg-teal-800 disabled:cursor-wait disabled:opacity-65">{sending ? 'Sending message…' : 'Send message'}{!sending && <FaArrowRight size={13} />}</button>
            </form>
          </div>
        </div>
        <div className="mt-14 overflow-hidden rounded-2xl border border-teal-900/10 bg-white">
          <div className="flex items-center justify-between gap-4 p-6"><h2 className="font-serif text-2xl text-teal-950">Find us in Samaná.</h2><span className="hidden text-xs text-slate-500 sm:block">TurquesaBay · Dominican Republic</span></div>
          <iframe title="TurquesaBay location map" src={MAP_URL} className="h-72 w-full border-0 sm:h-80" allowFullScreen loading="lazy" />
        </div>
      </div>
      <Notification {...notification} isVisible={notification.visible} onClose={() => setNotification((previous) => ({ ...previous, visible: false }))} />
    </section>
  );
}

export default Contact;
