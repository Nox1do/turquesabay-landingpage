import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';

function Notification({ message, isVisible, onClose, type = 'success' }) {
  const reduced = useReducedMotion();
  const isError = type === 'error';
  return <AnimatePresence>
    {isVisible && <motion.div role={isError ? 'alert' : 'status'} aria-atomic="true" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }} className={`fixed inset-x-4 bottom-5 z-[60] mx-auto flex max-w-lg items-start gap-4 rounded-2xl border p-5 shadow-xl sm:left-auto sm:right-6 sm:mx-0 ${isError ? 'border-red-200 bg-red-50 text-red-900' : 'border-teal-200 bg-teal-50 text-teal-950'}`}>
      {isError ? <FaExclamationCircle className="mt-1 shrink-0" /> : <FaCheck className="mt-1 shrink-0" />}
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      <button type="button" aria-label="Dismiss notification" onClick={onClose} className="-my-2 -mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl hover:bg-black/5">×</button>
    </motion.div>}
  </AnimatePresence>;
}

export default Notification;
