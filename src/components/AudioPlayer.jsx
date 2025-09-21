
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  // sincronizar el estado con el audio real
  useEffect(() => {
    const audio = audioRef.current;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} loop />

      <motion.button
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Pause size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Play size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default AudioPlayer;
