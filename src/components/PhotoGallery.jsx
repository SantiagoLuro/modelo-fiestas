import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Snackbar bien simple abajo-centro
const Snack = ({ open, title, desc, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 z-[90] pointer-events-auto"
      style={{ bottom: 'calc(16px + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-[560px] w-[calc(100%-2rem)] md:w-auto rounded-xl shadow-2xl border border-white/10 bg-black text-white px-4 py-3 flex items-start gap-3">
        <div className="min-w-0">
          <p className="font-semibold leading-tight">{title}</p>
          {desc ? (
            <p className="text-sm opacity-90 leading-snug break-words">{desc}</p>
          ) : null}
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-sm opacity-80 hover:opacity-100 underline underline-offset-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const PhotoGallery = () => {
  const navigate = useNavigate();

  // Cambiá esto a true cuando quieras habilitar el álbum
  const ENABLE_UPLOADS = false;

  // Estado del snackbar
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState('');
  const [snackDesc, setSnackDesc] = useState('');

  const showSnack = (title, desc) => {
    setSnackTitle(title);
    setSnackDesc(desc);
    setSnackOpen(true);
  };

  const handleAlbumClick = useCallback(
    (e) => {
      if (!ENABLE_UPLOADS) {
        e.preventDefault();
        showSnack(
          '¡Muy pronto!',
          'El día del evento se habilitará subir las fotos que compartiste en la fiesta. 💃📸'
        );
        return;
      }
      navigate('/album');
    },
    [navigate, ENABLE_UPLOADS]
  );

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
            <img
              className="w-full h-full object-cover rounded-2xl"
              alt=""
              src=""
            />
          </motion.div>

          <motion.div
            className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="w-full h-full object-cover rounded-2xl"
              alt=""
              src=""
            />
          </motion.div>

          <motion.div
            className="aspect-square bg-gradient-to-br from-purple-600/20 to-yellow-400/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="w-full h-full object-cover rounded-2xl"
              alt=""
              src=""
            />
          </motion.div>

          <motion.div
            className="aspect-square bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-2xl glass-effect flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="w-full h-full object-cover rounded-2xl"
              alt=""
              src=""
            />
          </motion.div>
        </motion.div>

        {/* Link con handler para mostrar el cartelito */}
        <Link to="/album" onClick={handleAlbumClick}>
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

      {/* Snackbar abajo-centro */}
      <Snack
        open={snackOpen}
        title={snackTitle}
        desc={snackDesc}
        onClose={() => setSnackOpen(false)}
      />
    </section>
  );
};

export default PhotoGallery;
