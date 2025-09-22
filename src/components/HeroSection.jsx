import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Título principal: XV en Sprite Graffiti */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold font-horizon gradient-text mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(212, 175, 55, 0.7)", // dorado
                "0 0 40px rgba(139, 0, 0, 0.7)",    // bordó
                "0 0 20px rgba(212, 175, 55, 0.7)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            XV
          </motion.h1>

          {/* Subtítulo: Julieta en Klemer Display (elegante) */}
          <motion.h2
            className="text-6xl md:text-7xl playfair text-red-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            JULIETA
          </motion.h2>
        </motion.div>

        {/* Frase cálida en Owners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="sparkle"
        >
          <p className="text-2xl md:text-3xl dancing-script text-white/90 mb-6">
            ¡Let's party!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="glass-effect rounded-2xl p-6 max-w-md mx-auto"
        >
          <p className="text-lg playfair text-white/90">
            Te invitamos a celebrar este momento tan especial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
