import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

const EventDetails = () => {
  const details = [
    {
      icon: Calendar,
      title: 'Fecha',
      info: 'Viernes 24 de Octubre de 2025',
    },
    {
      icon: Clock,
      title: 'Hora',
      info: '21:00 hs - 5:30hs',
      subtitle: '(Por favor, ser puntuales)',
    },
    {
      icon: MapPin,
      title: 'Lugar',
      info: 'Janos Maschwitz',
      subtitle: 'Colectora Este 2555, Ramal Escobar Km 44,5',
    },
    {
      icon: Sparkles,
      title: 'Celebración',
      info: 'Una noche mágica e inolvidable',
    },
  ];

  const handleMapRedirect = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Janos+Maschwitz,+Colectora+Este+2555,+Ramal+Escobar+Km+44,5,+1625,+B1623+Ingeniero+Maschwitz,+Provincia+de+Buenos+Aires',
      '_blank'
    );
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="section-divider"></div>

      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl playfair gradient-text mb-4">
            Detalles de la Fiesta
          </h2>
          <p className="text-xl text-white/80 dancing-script">
            Todo lo que necesitas saber para esta noche especial
          </p>
        </motion.div>

        {/* Cuadrículas de detalles */}
        <div className="grid md:grid-cols-2 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              className="glass-effect rounded-2xl p-8 sparkle group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-4">
                {/* Icono con gradiente bordó-dorado */}
                <motion.div
                  className="p-3 bg-gradient-to-r from-[#800000] via-[#b30000] to-[#FFD700] rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <detail.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Texto */}
                <div className="flex-1">
                  <h3 className="text-2xl playfair gradient-text mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-lg text-white/90 mb-1">{detail.info}</p>
                  {detail.subtitle && (
                    <p className="text-white/70">{detail.subtitle}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleMapRedirect}
            className="bg-gradient-to-r from-[#800000] via-[#b30000] to-[#FFD700] text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow dancing-script"
          >
            Cómo Llegar
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
