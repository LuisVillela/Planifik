// src/components/Calendar.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  // Obtener tareas del backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  // Formatear fecha a YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return null;
    // Si 'date' es un objeto Date
    if (Object.prototype.toString.call(date) === '[object Date]') {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    // Si 'date' es una cadena, tomamos los primeros 10 caracteres
    return date.substring(0, 10);
  };

  // Actualizar las tareas para la fecha seleccionada, incluyendo solo las pendientes
  useEffect(() => {
    const formattedSelectedDate = formatDate(selectedDate);
    const tasksOnDate = tasks.filter((task) => {
      const taskDueDate = formatDate(task.due_date);
      return (
        taskDueDate === formattedSelectedDate &&
        task.is_done === 0 // Filtrar solo tareas pendientes
      );
    });
    setTasksForSelectedDate(tasksOnDate);
  }, [selectedDate, tasks]);

  // Destacar las fechas con tareas pendientes
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = formatDate(date);
      const hasTask = tasks.some((task) => {
        const taskDueDate = formatDate(task.due_date);
        return taskDueDate === dateString && task.is_done === 0;
      });
      if (hasTask) {
        return <div className="dot"></div>;
      }
    }
    return null;
  };

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Barra superior fija con título */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">Calendar</h1>
      </header>

      {/* Contenido principal con scroll */}
      <div className="flex flex-col flex-grow items-center justify-start p-4 text-center mt-24 overflow-auto">
        {/* Calendario */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />

        {/* Lista de tareas para la fecha seleccionada */}
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            Tareas para {selectedDate.toLocaleDateString()}
          </h2>
          {tasksForSelectedDate.length > 0 ? (
            <ul className="space-y-4">
              {tasksForSelectedDate.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-white shadow rounded-md"
                >
                  <span className="text-gray-800">{task.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay tareas pendientes para esta fecha.</p>
          )}
        </div>
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

      {/* Estilos para el punto debajo de las fechas con tareas */}
      <style jsx>{`
        .dot {
          height: 6px;
          width: 6px;
          background-color: #3182ce; /* azul */
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
