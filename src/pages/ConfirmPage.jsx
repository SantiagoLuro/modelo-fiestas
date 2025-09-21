
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, CheckCircle, XCircle, Users, Utensils } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ConfirmPage = () => {
  const [asistencia, setAsistencia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "¡Confirmación recibida!",
      description: "¡Gracias por responder! Te esperamos para celebrar. 🎉",
      duration: 4000,
    });
    e.target.reset();
    setAsistencia('');
  };

  return (
    <>
      <Helmet>
        <title>Confirmar Asistencia - XV de Julieta</title>
        <meta name="description" content="Confirma tu asistencia a la fiesta de XV de Julieta." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
      >
        <Link to="/" className="absolute top-4 left-4 text-gray-600 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-20">
          <ArrowLeft size={24} />
        </Link>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 playfair mb-2">Confirmación de Asistencia</h1>
            <p className="text-gray-500">Ingresa tus datos y confirma tu asistencia.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                <User size={18} className="text-pink-500" />
                Nombre y Apellido
              </label>
              <input type="text" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 transition" />
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-3 block">Asistencia</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.label whileTap={{ scale: 0.95 }} className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 ${asistencia === 'si' ? 'bg-green-100 border-green-400 ring-2 ring-green-300' : 'border-gray-300'}`}>
                  <input type="radio" name="asistencia" value="si" required className="hidden" onChange={(e) => setAsistencia(e.target.value)} />
                  <CheckCircle size={20} className={asistencia === 'si' ? 'text-green-600' : 'text-gray-400'} />
                  <span className={asistencia === 'si' ? 'text-green-800 font-semibold' : 'text-gray-700'}>Sí, confirmo</span>
                </motion.label>
                <motion.label whileTap={{ scale: 0.95 }} className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 ${asistencia === 'no' ? 'bg-red-100 border-red-400 ring-2 ring-red-300' : 'border-gray-300'}`}>
                  <input type="radio" name="asistencia" value="no" required className="hidden" onChange={(e) => setAsistencia(e.target.value)} />
                  <XCircle size={20} className={asistencia === 'no' ? 'text-red-600' : 'text-gray-400'} />
                  <span className={asistencia === 'no' ? 'text-red-800 font-semibold' : 'text-gray-700'}>No podré asistir</span>
                </motion.label>
              </div>
            </div>

            {asistencia === 'si' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <div>
                  <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <Users size={18} className="text-purple-500" />
                    ¿Asistes con tu grupo familiar?
                  </label>
                  <textarea rows="2" placeholder="Indicar cantidad de asistentes y nombres (según corresponda)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 transition resize-none" />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <Utensils size={18} className="text-yellow-500" />
                    ¿Tienes alguna restricción alimenticia?
                  </label>
                  <textarea rows="2" placeholder="Vegano/a, celíaco/a, otra..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 transition resize-none" />
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar Confirmación
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ConfirmPage;
