const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: 'Learn Angular',
    completed: false
  },
  {
    id: 2,
    title: 'Build Express API',
    completed: true
  }
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET one task
app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json(task);
});

// POST new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({
    message: 'Task deleted successfully'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});