import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Send } from 'lucide-react';

// =================== CONFIG ===================
const WEB_APP_URL = "";
const SHARED_SECRET = "abc123-martina-xv";
// ==============================================

/** Snackbar bottom-center bien contrastado (negro sólido / texto blanco) */
const Snack = ({ open, kind = "success", title, desc, onClose, duration = 4500 }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open) return null;

  const base =
    "pointer-events-auto max-w-[560px] w-[calc(100%-2rem)] md:w-auto rounded-xl px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)]";
  const style = {
    backgroundColor: "#000", // opaco real
    color: "#fff",
    border: kind === "error" ? "1px solid rgba(255, 77, 77, 0.6)" : "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 flex justify-center z-[999] isolate pointer-events-none"
      style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      role="status"
      aria-live="polite"
    >
      <div className={base} style={style}>
        <p className="font-semibold leading-tight">{title}</p>
        {desc ? <p className="text-sm opacity-90 leading-snug break-words">{desc}</p> : null}
        <button
          onClick={onClose}
          className="mt-1 text-sm opacity-80 hover:opacity-100 underline underline-offset-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const MusicPage = () => {
  const [snack, setSnack] = useState({ open: false, kind: "success", title: "", desc: "" });

  const showSnack = (kind, title, desc) =>
    setSnack({ open: true, kind, title, desc });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sugerencia = e.target.elements[0].value.trim();
    if (!sugerencia) return;

    const payload = {
      secret: SHARED_SECRET,
      type: "music",
      sugerencia
    };

    let ok = true;
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Error enviando sugerencia:", err);
      ok = false;
    }

    if (ok) {
      showSnack("success", "¡Sugerencia enviada!", "Gracias por ayudarnos a crear la playlist perfecta. 🎶");
      e.target.reset();
    } else {
      showSnack("error", "Error", "No se pudo enviar tu sugerencia. Probá más tarde.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sugerir Canciones - XV de Martina</title>
        <meta name="description" content="Sugiere canciones para la playlist de la fiesta de XV de Martina." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
      >
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-20"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative p-8 md:p-12 text-center z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="mx-auto w-20 h-20 mb-6 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              <Music className="w-10 h-10 gradient-text" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800 mb-2 playfair"
            >
              Sugerencias de canciones
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-500 mb-8"
            >
              ¿Qué canciones no pueden faltar en la fiesta?
            </motion.p>

            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <textarea
                  rows="3"
                  placeholder="Temas / Intérpretes"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Send size={18} />
                Enviar
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Snackbar opaco y notorio */}
      <Snack
        open={snack.open}
        kind={snack.kind}
        title={snack.title}
        desc={snack.desc}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default MusicPage;
