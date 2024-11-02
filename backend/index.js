require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = 5001;
const cors = require('cors');


// Middleware para manejar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({ origin: 'http://localhost:3000' }));


// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'planifik',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Validar que los campos no estén vacíos
    if (!username || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar el usuario en la base de datos
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Validar que los campos no estén vacíos
    if (!username || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    // Buscar el usuario en la base de datos
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }
  
      // Verificar si el usuario existe
      if (results.length === 0) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }
  
      const user = results[0];
  
      // Comparar la contraseña ingresada con la almacenada
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }
  
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
  });
  
  // Obtener todas las tareas de un usuario
app.get('/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving tasks', error: err });
    }
    res.json(results);
  });
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { userId, description } = req.body;
  db.query('INSERT INTO tasks (user_id, description) VALUES (?, ?)', [userId, description], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating task', error: err });
    }
    res.status(201).json({ id: results.insertId, userId, description, is_done: 0 });
  });
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { description, is_done } = req.body;
  db.query('UPDATE tasks SET description = ?, is_done = ? WHERE id = ?', [description, is_done, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating task', error: err });
    }
    res.json({ message: 'Task updated successfully' });
  });
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting task', error: err });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});
