
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-black/50 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <motion.div
            className="flex justify-center items-center space-x-4 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-2xl dancing-script gradient-text">Martina</span>

          </motion.div>
          
          <p className="text-xl dancing-script text-white/80 mb-4">
            ¡Gracias por ser parte de este momento tan especial!
          </p>
          
          <motion.div
            className="flex justify-center items-center space-x-2 text-white/60"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>para una noche inolvidable</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 text-sm">
            © 2025 - XV Años de Martina - Una celebración única
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
