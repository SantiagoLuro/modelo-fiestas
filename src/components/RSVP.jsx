
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const RSVP = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            className="inline-block p-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl playfair gradient-text mb-4">
            Confirmación de Asistencia
          </h2>
          
          <p className="text-xl text-white/80 mb-4">
            Cuento con tu presencia.
          </p>
          <p className="text-lg dancing-script text-yellow-300">
            ¡Confirmá tu asistencia!
          </p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto sparkle"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl playfair gradient-text mb-4">
                ¿Nos acompañas en esta celebración?
              </h3>
              <p className="text-white/80 mb-6">
                Tu presencia hará que esta noche sea aún más especial
              </p>
            </div>

            <Link to="/confirmar" className="block">
              <motion.button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check className="w-5 h-5" />
                <span>Confirmar Asistencia</span>
              </motion.button>
            </Link>

            <p className="text-sm text-white/60 text-center">
              Por favor confirma antes del 10 de Octubre
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
