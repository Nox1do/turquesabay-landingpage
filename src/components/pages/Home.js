import React, { useState } from 'react';
import HeroSection from './home/HeroSection';
import GallerySection from './home/GallerySection';
import PermitsSection from './home/PermitsSection';
import ExperienceSection from './home/ExperienceSection';
import CtaSection from './home/CtaSection';
import VideoModal from './home/VideoModal';
import { HERO_VIDEO_ID } from './home/homeContent';

/**
 * Home page. Each section owns its own content and styling, this component
 * is only responsible for page-level state (video modal) and section order.
 */
function Home({ isLoading }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (isLoading) return null;

  return (
    <div className="font-sans">
      <HeroSection onWatchVideo={() => setIsVideoOpen(true)} />
      <GallerySection />
      <PermitsSection />
      <ExperienceSection />
      <CtaSection />

      <VideoModal
        videoId={HERO_VIDEO_ID}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}

export default Home;
