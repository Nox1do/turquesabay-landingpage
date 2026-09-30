import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaExpand, FaRegImage } from 'react-icons/fa';
import useDialog from './assets/useDialog';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from './gallery/galleryContent';

function Photo({ image, failed, onError, fullScreen = false, reduced }) {
  if (failed) return <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#143c39] px-6 text-center text-white"><FaRegImage size={28} /><p>Photo unavailable</p><p className="max-w-sm text-sm text-white/70">{image.alt}. Please try another photo.</p></div>;
  return <motion.img key={image.id} src={image.src} alt={image.alt} width="1600" height="1067" onError={onError} initial={{ opacity: reduced ? 1 : 0.5 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.25 }} className={`absolute inset-0 h-full w-full ${fullScreen ? 'object-contain' : 'object-cover'}`} decoding="async" loading={fullScreen ? 'eager' : 'lazy'} />;
}

function ImageCarousel() {
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [failures, setFailures] = useState({});
  const reduced = useReducedMotion();
  const { dialogRef, restoreFocus } = useDialog({ isOpen, onClose: () => setIsOpen(false) });
  const touchStart = useRef(null);
  const swiped = useRef(false);
  const images = category === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((image) => image.category === category);
  const image = images[index];
  const move = (step) => setIndex((current) => (current + step + images.length) % images.length);
  const count = `${String(index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
  const fail = () => setFailures((current) => ({ ...current, [image.id]: true }));
  const swipeHandlers = {
    onTouchStart: (event) => {
      const touch = event.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
      swiped.current = false;
    },
    onTouchEnd: (event) => {
      if (!touchStart.current) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        move(dx < 0 ? 1 : -1);
        swiped.current = true;
      }
      touchStart.current = null;
    },
    onTouchCancel: () => { touchStart.current = null; },
  };
  const navigation = (direction) => <button type="button" aria-label={direction === -1 ? 'Previous photo' : 'Next photo'} onClick={() => move(direction)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/25 transition-colors hover:bg-teal-500/15">{direction === -1 ? <FaArrowLeft size={14} /> : <FaArrowRight size={14} />}</button>;

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="mb-7 flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setIndex(0); }} className={`min-h-11 rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${category === item ? 'border-teal-900 bg-teal-900 text-white' : 'border-teal-900/15 text-teal-900 hover:bg-teal-900/5'}`}>{item}</button>)}
      </div>
      <div className="overflow-hidden rounded-2xl bg-[#e9eeeb]">
        <button type="button" aria-label="Open photo full screen" onClick={() => { if (swiped.current) { swiped.current = false; return; } setIsOpen(true); }} {...swipeHandlers} style={{ touchAction: 'pan-y' }} className="group relative block aspect-[4/3] w-full overflow-hidden text-left sm:aspect-[16/9]">
          <Photo image={image} failed={failures[image.id]} onError={fail} reduced={reduced} />
          <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-3 text-xs font-medium text-white backdrop-blur-sm"><FaExpand />View full screen</span>
        </button>
        <div className="flex flex-col gap-4 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="min-w-0"><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">{image.category}</p><h3 className="font-serif text-xl text-teal-950 sm:text-2xl">{image.title}</h3><p className="mt-1 hidden text-sm text-slate-500 sm:block">{image.caption}</p></div>
          <div className="flex shrink-0 items-center justify-between gap-2 text-teal-900 sm:justify-start sm:gap-4">{navigation(-1)}<span aria-live="polite" aria-atomic="true" className="whitespace-nowrap text-xs tabular-nums">{count}</span>{navigation(1)}</div>
        </div>
      </div>
      <div className="mt-5 flex gap-3 overflow-x-auto pb-2" aria-label="Choose a photo">
        {images.map((item, n) => <button key={item.id} type="button" aria-label={`Show photo ${n + 1}: ${item.title}`} aria-pressed={n === index} onClick={() => setIndex(n)} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 sm:h-20 sm:w-28 ${n === index ? 'border-teal-700' : 'border-transparent opacity-60 hover:opacity-100'}`}><img src={item.src.replace('.webp', '-thumb.webp')} alt="" width="480" height="320" loading="lazy" className="h-full w-full object-cover" /></button>)}
      </div>
      {createPortal(<AnimatePresence onExitComplete={restoreFocus}>
        {isOpen && <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label="TurquesaBay photo gallery" tabIndex={-1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }} onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }} className="fixed inset-0 z-[100] flex flex-col bg-[#041d1c] p-4 text-white sm:p-8">
          <div className="flex items-center justify-between gap-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">TurquesaBay · {image.category}</p><button data-autofocus type="button" aria-label="Close gallery" onClick={() => setIsOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-2xl hover:bg-white/10">×</button></div>
          <div {...swipeHandlers} style={{ touchAction: 'pan-y' }} className="relative my-4 min-h-0 flex-1"><Photo image={image} failed={failures[image.id]} onError={fail} fullScreen reduced={reduced} /></div>
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5"><div className="min-w-0"><h3 className="font-serif text-xl sm:text-2xl">{image.title}</h3><p className="mt-1 max-w-xl text-xs text-white/70 sm:text-sm">{image.caption}</p></div><div className="flex items-center gap-4">{navigation(-1)}<span aria-live="polite" aria-atomic="true" className="text-xs tabular-nums">{count}</span>{navigation(1)}</div></div>
        </motion.div>}
      </AnimatePresence>, document.body)}
    </div>
  );
}

export default ImageCarousel;
