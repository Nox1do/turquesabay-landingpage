import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import useDialog from '../../assets/useDialog';
import { FaPlay } from 'react-icons/fa';

function VideoModal({ videoId, isOpen, onClose }) {
  const { dialogRef, restoreFocus } = useDialog({ isOpen, onClose });
  const reduced = useReducedMotion();
  return createPortal(
    <AnimatePresence onExitComplete={restoreFocus}>
      {isOpen && <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label="TurquesaBay film" tabIndex={-1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#041d1c]/95 p-5" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        <div className="w-full max-w-5xl">
          <div className="mb-4 flex items-center justify-between gap-4 text-white"><p className="text-sm">TurquesaBay · The film</p><button data-autofocus type="button" aria-label="Close video" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-xl hover:bg-white/10">×</button></div>
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" aria-label="Play film on YouTube" className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-teal-950 shadow-2xl">
            <img src="/images/setting.webp" alt="" width="1600" height="1067" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80" />
            <span className="relative flex flex-col items-center gap-4 text-white"><span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-teal-950/60"><FaPlay size={20} /></span><span className="rounded-full bg-teal-950/80 px-5 py-2 text-sm font-semibold">Play film on YouTube ↗</span></span>
          </a>
          <p className="mt-4 text-center text-sm text-white/75">Watch the complete film on YouTube. Opens in a new tab.</p>
        </div>
      </motion.div>}
    </AnimatePresence>, document.body
  );
}

export default VideoModal;
