
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const partyDate = new Date('2025-11-19T21:30:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = partyDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl playfair gradient-text mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          ¡Empezó la cuenta regresiva!
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="glass-effect rounded-2xl p-6 sparkle"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold countdown-glow gradient-text"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-sm md:text-base text-white/80 mt-2 playfair">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xl dancing-script text-white/80 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          ¡Cada segundo cuenta para esta celebración única!
        </motion.p>
      </div>
    </section>
  );
};

export default CountdownSection;
