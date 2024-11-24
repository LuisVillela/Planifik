// index.js

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const fs = require('fs');
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
  multipleStatements: true, // Habilitar múltiples sentencias
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');

    // Cargar y ejecutar el script de inicialización SQL
    const initSql = fs.readFileSync('./init.sql', 'utf8'); // Asegúrate de tener un archivo `init.sql` en el mismo directorio
    db.query(initSql, (err) => {
      if (err) {
        console.error('Error initializing database:', err);
      } else {
        console.log('Database initialized successfully');
      }
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

// Tu lógica de rutas sigue aquí

// Endpoint de registro modificado para devolver userId
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      const userId = results.insertId; // Obtener el userId
      res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Endpoint de inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Devolver el userId junto con el mensaje de éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user.id });
  });
});

// Obtener tareas del usuario
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
  const { userId, description, due_date } = req.body;
  db.query(
    'INSERT INTO tasks (user_id, description, due_date) VALUES (?, ?, ?)',
    [userId, description, due_date],
    (err, results) => {
      if (err) {
        console.error('Error inserting task:', err);
        return res.status(500).json({ message: 'Error creating task', error: err });
      }
      res
        .status(201)
        .json({ id: results.insertId, userId, description, due_date, is_done: 0 });
    }
  );
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { description, is_done, due_date } = req.body;
  db.query(
    'UPDATE tasks SET description = ?, is_done = ?, due_date = ? WHERE id = ?',
    [description, is_done, due_date, id],
    (err) => {
      if (err) {
        console.error('Error updating task:', err); // Añade este console.error
        return res.status(500).json({ message: 'Error updating task', error: err });
      }
      res.json({ message: 'Task updated successfully' });
    }
  );
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
