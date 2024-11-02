// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Pantalla Principal</h2>
      <p className="text-lg text-gray-600">
        Aquí se mostrarán las tareas y el calendario.
      </p>
    </div>
  );
};

export default Home;
