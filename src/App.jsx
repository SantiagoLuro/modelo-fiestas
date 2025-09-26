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
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const percent = ratio * 100;
      document.documentElement.style.setProperty('--scroll', String(ratio));
      document.documentElement.style.setProperty('--scroll-y', String(percent));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fondo SOLO en Home y sin capturar eventos */}
      {isHome && (
        <div className="fixed inset-0 -z-30 pointer-events-none" aria-hidden="true">
          <img
            src="/bg-bottom.jpg"
            alt=""
            className="w-full h-full object-cover"
            decoding="async"
            fetchpriority="high"
            style={{
              transform: 'translateY(calc(var(--scroll-y, 0) * -0.2%))',
              willChange: 'transform'
            }}
          />
        </div>
      )}

      {/* Partículas SOLO en Home */}
      {isHome && <FloatingParticles />}

      {/* Audio normal (sin overlay full-screen) */}
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

      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "bg-[#1a0007]/90 border border-[#800000] text-white rounded-xl shadow-lg backdrop-blur-md",
        }}
      />
    </>
  );
}

export default App;
