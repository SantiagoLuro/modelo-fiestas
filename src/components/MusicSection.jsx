
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MusicSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            className="inline-block p-4 bg-gradient-to-r from-red-900 to-6ed-500 rounded-full mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Music className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl playfair gradient-text mb-4">
            ¡Playlist!
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            ¡Ayúdame sugiriendo las canciones que pensás que no pueden faltar en la fiesta!
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {['Reggaeton', 'Pop Latino', 'Clásicos'].map((genre, index) => (
            <motion.div
              key={genre}
              className="glass-effect rounded-2xl p-6 sparkle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-4">🎵</div>
              <h3 className="text-xl playfair gradient-text mb-2">{genre}</h3>
              <p className="text-white/70">Para que todos bailen</p>
            </motion.div>
          ))}
        </motion.div>

        <Link to="/musica">
          <motion.button
            className="bg-gradient-to-r from-red-950 to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow flex items-center space-x-2 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Sugerir Canción</span>
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default MusicSection;
