// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Bienvenido a Planifik</h1>
      <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
      <button onClick={() => navigate('/register')}>Registrarse</button>
    </div>
  );
};

export default Welcome;
