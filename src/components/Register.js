// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/register', { username, password });
      setMessage(response.data.message); // Muestra el mensaje de éxito

      // Redirige al usuario a /home después de un registro exitoso
      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrar usuario'); // Muestra el mensaje de error
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>} {/* Muestra el mensaje de respuesta */}
    </div>
  );
};

export default Register;
