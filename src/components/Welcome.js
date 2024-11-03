// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Logo Image at the top */}
      <img 
        src="/planifikimg.png" 
        alt="Planifik Logo" 
        className="mb-10" // Increased margin-bottom for more space
        style={{ width: '350px', height: 'auto' }} // Slightly increased width
      />

      {/* Main container for text and buttons */}
      <div className="max-w-md text-left space-y-8"> {/* Added space-y-8 for vertical spacing */}
        {/* Main text */}
        <h1 className="text-4xl font-bold text-gray-800">
          Manage your <br /> daily tasks.
        </h1>
        
        {/* Secondary text */}
        <p className="text-gray-600 text-lg">
          Add your daily or weekly events to the calendar and save your time.
        </p>

        {/* Button container with horizontal space */}
        <div className="flex space-x-4">
          {/* Get Started Button */}
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Get Started
          </button>
          
          {/* Login Button with Arrow Icon */}
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
