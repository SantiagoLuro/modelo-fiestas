import React, { useState, useEffect } from "react";
import { useAlbum } from "@/context/AlbumContext";
import { Upload, Image as ImageIcon, Eye, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const Snack = ({ open, kind = "success", title, desc, onClose }) => {
  // Colores con alto contraste para cualquier fondo
  const base =
    "pointer-events-auto max-w-[520px] w-[calc(100%-2rem)] md:w-auto rounded-xl shadow-2xl border px-4 py-3 flex items-start gap-3";
  const styles =
    kind === "success"
      ? "bg-white text-black border-black/10"
      : "bg-black text-white border-white/10";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed left-1/2 -translate-x-1/2 z-[80]"
          style={{
            bottom: "calc(16px + env(safe-area-inset-bottom))",
          }}
          role="status"
          aria-live="polite"
        >
          <div className={base + " " + styles}>
            <div className="mt-0.5">
              {kind === "success" ? (
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-5 h-5" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold leading-tight">{title}</p>
              {desc ? (
                <p className="text-sm opacity-80 leading-snug break-words">{desc}</p>
              ) : null}
            </div>
            <button
              onClick={onClose}
              className="ml-auto text-sm opacity-70 hover:opacity-100 underline underline-offset-2"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AlbumPage = () => {
  const { addPhoto } = useAlbum();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [snack, setSnack] = useState({ open: false, kind: "success", title: "", desc: "" });
  const navigate = useNavigate();

  // Auto-cierre del snackbar
  useEffect(() => {
    if (!snack.open) return;
    const t = setTimeout(() => setSnack((s) => ({ ...s, open: false })), 3000);
    return () => clearTimeout(t);
  }, [snack.open]);

  const showSnack = (kind, title, desc = "") =>
    setSnack({ open: true, kind, title, desc });

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  // Subir a Supabase
  const handleUpload = async () => {
    if (!file) {
      showSnack("error", "⚠️ Seleccioná una foto", "Tenés que elegir un archivo antes de subir.");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("album-julieta")
        .upload(`uploads/${Date.now()}-${file.name}`, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("album-julieta")
        .getPublicUrl(data.path);

      addPhoto(publicUrlData.publicUrl);

      showSnack("success", "✅ Foto subida con éxito", "Ya está guardada en el álbum.");

      setFile(null);
      setPreview(null);
    } catch (err) {
      showSnack("error", "❌ Error al subir", err.message || "Probá de nuevo en un momento.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-[#1a0007] to-black text-white px-6 py-10 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 🔙 Botón Volver */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={22} /> Volver
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#ff4d4d] mb-2">📤 Subí tus Fotos</h1>
        <p className="text-gray-300">Elegí tus mejores recuerdos y compartilos en el álbum ✨</p>
      </div>

      {/* Formulario */}
      <motion.div
        className="flex flex-col items-center gap-6 max-w-md mx-auto bg-[#2a0a0a]/80 p-6 rounded-2xl shadow-2xl border border-[#4d0f0f]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Input */}
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#800000] hover:border-[#ff3333] rounded-xl p-6 cursor-pointer transition">
          <ImageIcon size={40} className="mb-3 text-[#ff4d4d]" />
          <span className="text-gray-300">{file ? file.name : "Elegí una imagen"}</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {/* Preview */}
        {preview && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={preview}
              alt="Vista previa"
              className="rounded-xl shadow-md w-full max-h-64 object-cover border border-[#800000]"
            />
          </motion.div>
        )}

        {/* Botón Subir */}
        <motion.button
          onClick={handleUpload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#800000] via-[#b30000] to-[#FFD700] px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition"
        >
          <Upload size={20} /> Subir Foto
        </motion.button>

        {/* Link al álbum */}
        <Link
          to="/album-view"
          className="flex items-center gap-2 text-[#ff4d4d] hover:text-[#ff1a1a] transition mt-2"
        >
          <Eye size={18} /> Ver Álbum
        </Link>
      </motion.div>

      {/* Snackbar flotante accesible y responsivo */}
      <Snack
        open={snack.open}
        kind={snack.kind}
        title={snack.title}
        desc={snack.desc}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      />
    </motion.div>
  );
};

export default AlbumPage;
