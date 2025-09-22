import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import FloatingParticles from '@/components/FloatingParticles';
import Home from '@/pages/Home';
import AlbumPage from '@/pages/AlbumPage';
import AlbumView from '@/pages/AlbumView';
import MusicPage from '@/pages/MusicPage';
import ConfirmPage from '@/pages/ConfirmPage';
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll)); // 0 → 1
      const percent = ratio * 100;
      document.documentElement.style.setProperty('--scroll', String(ratio));      // 0..1
      document.documentElement.style.setProperty('--scroll-y', String(percent));  // 0..100
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Imagen SOLO en el fondo (se muestra al final) */}
      <div className="bottom-photo" aria-hidden="true" />

      <FloatingParticles />
      <AudioPlayer src="/maxi-trusso.mp3" />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/album-view" element={<AlbumView />} />
          <Route path="/musica" element={<MusicPage />} />
          <Route path="/confirmar" element={<ConfirmPage />} />
        </Routes>
      </AnimatePresence>

      <Toaster />
    </>
  );
}

export default App;
