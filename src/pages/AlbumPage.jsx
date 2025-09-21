import React, { useState } from "react";
import { useAlbum } from "@/context/AlbumContext";
import { toast } from "@/components/ui/use-toast";
import { Upload, Image as ImageIcon, Eye, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

const AlbumPage = () => {
  const { addPhoto } = useAlbum();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  // Subir a Supabase
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "⚠️ Seleccioná una foto",
        description: "Tenés que elegir un archivo antes de subir.",
      });
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

      toast({
        title: "✅ Foto subida con éxito",
        description: "Ya está guardada en el álbum.",
      });

      setFile(null);
      setPreview(null);
    } catch (err) {
      toast({
        title: "❌ Error al subir",
        description: err.message,
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-[#1a0007] to-black text-white px-6 py-10 relative"
      initial={{ opacity: 0, y: 50 }} // animación de entrada
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#ff4d4d] mb-2">
          📤 Subí tus Fotos
        </h1>
        <p className="text-gray-300">
          Elegí tus mejores recuerdos y compartilos en el álbum ✨
        </p>
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
          <span className="text-gray-300">
            {file ? file.name : "Elegí una imagen"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
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
    </motion.div>
  );
};

export default AlbumPage;
