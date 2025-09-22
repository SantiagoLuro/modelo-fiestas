
import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const PhotoGallery = () => {
  return (
    <section className="py-20 px-4 bg-black/30 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            className="inline-block p-4 bg-gradient-to-r from-red-950 to-red-600 rounded-full mb-6"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Camera className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl playfair gradient-text mb-4">
            Álbum de Fotos
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Te comparto mi álbum para que ese día subas todas tus fotos y podamos disfrutarlas juntos.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="aspect-square bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img  className="w-full h-full object-cover rounded-2xl" alt="Julieta de niña con gorro" src="https://horizons-cdn.hostinger.com/701bc10f-3750-4d01-8fb2-1c567ca2f257/110c3015a22d66e5c470f02034a6a35b.jpg" />
          </motion.div>
          
          <motion.div
            className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img  className="w-full h-full object-cover rounded-2xl" alt="Julieta de bebé" src="https://horizons-cdn.hostinger.com/701bc10f-3750-4d01-8fb2-1c567ca2f257/17c2ea9bec6aa740c1f23eb9feb7da8e.jpg" />
          </motion.div>
          
          <motion.div
            className="aspect-square bg-gradient-to-br from-purple-600/20 to-yellow-400/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img  className="w-full h-full object-cover rounded-2xl" alt="Julieta en la playa" src="https://horizons-cdn.hostinger.com/701bc10f-3750-4d01-8fb2-1c567ca2f257/cb3f8851c2ec63d18541b5ce35fd8d47.jpg" />
          </motion.div>
          
          <motion.div
            className="aspect-square bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img  className="w-full h-full object-cover rounded-2xl" alt="Julieta con bengala" src="https://horizons-cdn.hostinger.com/701bc10f-3750-4d01-8fb2-1c567ca2f257/1af7a43dd9a257046a5e5b756c92071a.jpg" />
          </motion.div>
        </motion.div>

        <Link to="/album">
          <motion.button
            className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold btn-glow hover:bg-yellow-100 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Álbum Completo
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default PhotoGallery;
