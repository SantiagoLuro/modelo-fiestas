
import React from 'react';
import { motion } from 'framer-motion';

const DressCode = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            className="inline-block text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            👗👔
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl playfair gradient-text mb-4">
            Dress Code
          </h2>
          
          <motion.div
            className="glass-effect rounded-2xl p-8 max-w-md mx-auto sparkle"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl dancing-script gradient-text mb-4">
              Elegante Sport
            </h3>
            <p className="text-lg text-white/80">
              Vístete para brillar en esta noche especial
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass-effect rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-4xl mb-4"></div>
<h4 className="text-xl playfair gradient-text mb-2">Mujeres</h4>
<p className="text-white/80">
  Vestimenta elegante y oscura.  
</p>
  <p className="text-white/80">No traer: rojo, plateado, brillos, naranja, amarillo y colores claros.</p>
</motion.div>

<motion.div
  className="glass-effect rounded-2xl p-6"
  whileHover={{ scale: 1.02 }}
>
  <div className="text-4xl mb-4"></div>
  <h4 className="text-xl playfair gradient-text mb-2">Hombres</h4>
  <p className="text-white/80">
    Traje o vestimenta formal en tonos oscuros.  
    <p>No traer: rojo, plateado, brillos, naranja, amarillo y colores claros.</p>
  </p>
</motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default DressCode;
