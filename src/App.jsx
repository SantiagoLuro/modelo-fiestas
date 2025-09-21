import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import FloatingParticles from '@/components/FloatingParticles';
import Home from '@/pages/Home';
import AlbumPage from '@/pages/AlbumPage';
import AlbumView from '@/pages/AlbumView';   // 👈 import nuevo
import MusicPage from '@/pages/MusicPage';
import ConfirmPage from '@/pages/ConfirmPage';
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.documentElement.style.setProperty('--scroll-y', scrollPercentage);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <FloatingParticles />

      {/* 🎶 Tu reproductor de fondo */}
      <AudioPlayer src="/maxi-trusso.mp3" />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/album-view" element={<AlbumView />} /> {/* 👈 nueva ruta */}
          <Route path="/musica" element={<MusicPage />} />
          <Route path="/confirmar" element={<ConfirmPage />} />
        </Routes>
      </AnimatePresence>

      <Toaster />
    </>
  );
}

export default App;
