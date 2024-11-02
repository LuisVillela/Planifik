// src/components/Calendar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Calendar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Barra superior fija con título */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">Calendar</h1>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-grow items-center justify-center p-4 text-center mt-20">
        <h2 className="text-lg font-semibold text-gray-700">This is the Calendar Page</h2>
      </div>

      {/* Barra de navegación inferior */}
      <nav className="bg-white fixed bottom-0 left-0 w-full border-t border-gray-300 py-3 px-4">
        <div className="flex justify-around py-2">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-sm">Home</span>
          </button>
          <button
            onClick={() => navigate('/todolist')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <ClipboardDocumentListIcon className="h-6 w-6" />
            <span className="text-sm">To-Do</span>
          </button>
          <button
            onClick={() => navigate('/calendar')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <CalendarDaysIcon className="h-6 w-6" />
            <span className="text-sm">Calendar</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <Cog6ToothIcon className="h-6 w-6" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Calendar;
