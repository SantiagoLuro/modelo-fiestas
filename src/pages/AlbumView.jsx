import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Maximize2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AlbumView = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();

  // Cargar fotos desde Supabase al montar el componente
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.storage
        .from("album-julieta")
        .list("uploads", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

      if (error) {
        console.error("Error al traer fotos:", error.message);
        return;
      }

      const urls = data.map((file) => {
        const { data: publicUrlData } = supabase.storage
          .from("album-julieta")
          .getPublicUrl(`uploads/${file.name}`);
        return publicUrlData.publicUrl;
      });

      setPhotos(urls);
    };

    fetchPhotos();
  }, []);

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
      <div className="flex justify-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-[#ff4d4d]">
          📸 Galería de Recuerdos
        </h1>
      </div>

      {/* Grid de fotos */}
      {photos.length === 0 ? (
        <p className="text-center text-gray-400">Todavía no hay fotos subidas.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => setSelectedPhoto(src)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <img
                src={src}
                alt={`Foto ${index + 1}`}
                className="w-full h-40 md:h-48 lg:h-56 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Maximize2 size={24} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal para ver foto ampliada */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <motion.img
              src={selectedPhoto}
              alt="Foto ampliada"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <p className="text-center text-gray-400 text-sm mt-10">
        Galería creada con ❤️ — Disfrutá tus momentos.
      </p>
    </motion.div>
  );
};

export default AlbumView;
