import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HomeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, Cog6ToothIcon, TrashIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';

const Tasks = () => {
  const navigate = useNavigate();
  const userId = 1; // ID de usuario para pruebas; ajústalo según corresponda
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Obtener tareas
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Crear tarea
  const addTask = async () => {
    if (newTask.trim() === '') return;
    try {
      const response = await axios.post('http://localhost:5001/tasks', {
        userId,
        description: newTask,
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Actualizar tarea
  const updateTask = async (id, description, isDone) => {
    try {
      await axios.put(`http://localhost:5001/tasks/${id}`, { description, is_done: isDone });
      fetchTasks(); // Actualizar la lista de tareas después de la edición
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Barra superior fija con título */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">Tasks</h1>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-col flex-grow items-center justify-start p-4 text-center mt-28">
        <div className="w-full max-w-md">
          {/* Entrada para nueva tarea */}
          <div className="flex items-center space-x-2 mb-6">
            <input
              type="text"
              placeholder="New task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded-full">
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
          {/* Lista de tareas */}
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 bg-white shadow rounded-md"
              >
                <div className="flex items-center space-x-2 flex-grow">
                  {/* Círculo para marcar como completada */}
                  <button
                    onClick={() => updateTask(task.id, task.description, !task.is_done)}
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                      task.is_done ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-400 text-transparent'
                    }`}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </button>
                  {/* Input para editar la tarea */}
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => updateTask(task.id, e.target.value, task.is_done)}
                    className="w-full px-2 py-1 focus:outline-none bg-transparent"
                  />
                </div>
                {/* Icono para eliminar tarea */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 font-bold ml-2"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
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
