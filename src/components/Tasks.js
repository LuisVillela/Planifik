// src/components/Tasks.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

const Tasks = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Obtener tareas
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/tasks/${userId}`);
      // Ordenar las tareas por fecha
      const sortedTasks = response.data.sort((a, b) => {
        if (!a.due_date) return 1; // Las tareas sin fecha van al final
        if (!b.due_date) return -1;
        return new Date(a.due_date) - new Date(b.due_date);
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Formatear fecha a 'YYYY-MM-DD'
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

  // Agregar nueva tarea
  const addTask = async () => {
    if (!newTask.trim() || !newTaskDueDate) return;
    try {
      await axios.post('http://localhost:5001/tasks', {
        userId,
        description: newTask,
        due_date: newTaskDueDate,
      });
      setNewTask('');
      setNewTaskDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Actualizar tarea
  const updateTask = async (id, description, isDone, dueDate) => {
    try {
      const formattedDueDate = formatDate(dueDate);
      await axios.put(`http://localhost:5001/tasks/${id}`, {
        description,
        is_done: isDone ? 1 : 0,
        due_date: formattedDueDate,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
      {/* Barra superior */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">To-Do List</h1>
      </header>

      {/* Contenido principal con scroll */}
      <div className="flex flex-col flex-grow items-center justify-start p-4 text-center mt-24 overflow-auto">
        {/* Lista de tareas */}
        <ul className="w-full max-w-md space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 bg-white shadow rounded-md ${
                task.is_done ? 'opacity-50 line-through' : ''
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-gray-800">{task.description}</span>
                {task.due_date && (
                  <span className="text-gray-600 text-sm">
                    Fecha límite: {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateTask(task.id, task.description, !task.is_done, task.due_date)
                  }
                  className="text-green-500 hover:text-green-700"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Espacio para permitir que el botón de agregar tarea sea visible */}
        <div className="mt-6 w-full max-w-md flex-shrink-0">
          {/* Formulario para agregar nueva tarea */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nueva tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={addTask}
              disabled={!newTask.trim() || !newTaskDueDate}
              className={`bg-blue-500 text-white p-2 rounded-full ${
                !newTask.trim() || !newTaskDueDate ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
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
    </div>
  );
};

export default Tasks;
