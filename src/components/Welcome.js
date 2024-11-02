// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">Bienvenido a Planifik</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Welcome;
