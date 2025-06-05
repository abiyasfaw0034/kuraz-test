const express = require("express");
const app = express();
const port = 3000; // You can choose any port

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Hardcoded array to store tasks
let tasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true },
  { id: 3, title: "Walk the dog", completed: false },
];

// --- API Routes ---

// GET /api/tasks - Return all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - Add a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({
        message: "Task title is required and must be a non-empty string.",
      });
  }

  const newId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  const newTask = {
    id: newId,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask); // 201 Created
});

// PUT /api/tasks/:id - Mark a task as completed (or toggle completion)
app.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found." });
  }

  // Toggle completed status. If req.body.completed is provided, use it, otherwise toggle
  const { completed } = req.body; // Allow setting completed directly via body if desired

  if (typeof completed === "boolean") {
    tasks[taskIndex].completed = completed;
  } else {
    // If 'completed' not in body, simply toggle current status
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
  }

  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id - Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: "Task not found." });
  }

  res.status(204).send(); // 204 No Content
});

// --- Simple "API is running" page ---
app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>To-Do API Status</title>
            <style>
                body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0; margin: 0; }
                .container { text-align: center; background-color: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #333; }
                p { color: #666; font-size: 1.1em; }
                code { background-color: #e2e2e2; padding: 3px 6px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>To-Do API is Running!</h1>
                <p>Access the API endpoints:</p>
                <p><code>GET /api/tasks</code> - Get all tasks</p>
                <p><code>POST /api/tasks</code> - Add a new task (send JSON body: <code>{"title": "New Task"}</code>)</p>
                <p><code>PUT /api/tasks/:id</code> - Mark task as completed/toggle (e.g., <code>/api/tasks/1</code> or send JSON body: <code>{"completed": true}</code>)</p>
                <p><code>DELETE /api/tasks/:id</code> - Delete a task (e.g., <code>/api/tasks/1</code>)</p>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
  console.log(`To-Do API listening at http://localhost:${port}`);
  console.log(`API endpoints available at http://localhost:${port}/api/tasks`);
});
