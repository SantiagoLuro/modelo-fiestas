import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const regen = () => {
      const arr = [];
      for (let i = 0; i < 50; i++) {
        arr.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 5,
        });
      }
      setParticles(arr);
    };
    regen();
    window.addEventListener('resize', regen);
    return () => window.removeEventListener('resize', regen);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: 'rgba(255, 105, 180, 0.5)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, -15, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
