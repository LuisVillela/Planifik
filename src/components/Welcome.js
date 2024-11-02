// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      {/* Contenedor general para texto y botones, alineado a la izquierda */}
      <div className="max-w-md text-left">
        {/* Texto principal */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Manage your <br /> daily tasks.
        </h1>
        
        {/* Texto secundario */}
        <p className="text-gray-600 text-lg mb-12">
          Add your daily or weekly events to the calendar and save your time.
        </p>

        {/* Contenedor de botones alineado a la izquierda */}
        <div className="flex space-x-4">
          {/* Botón Get Started */}
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Get Started
          </button>
          
          {/* Botón de Login con ícono de flecha */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
