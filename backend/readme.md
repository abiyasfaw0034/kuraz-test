# Simple To-Do REST API (Backend Only)

A basic RESTful API built with Node.js and Express.js for managing a list of tasks. This API provides standard CRUD (Create, Read, Update, Delete) operations for tasks, with data stored in a local array (in-memory) for simplicity.

## Features

- **GET /api/tasks:** Retrieve a list of all tasks.
- **POST /api/tasks:** Add a new task to the list.
  - **Request Body:** `{"title": "New Task Title"}`
  - **Validation:** Ensures `title` is provided, is a string, and is not empty.
- **PUT /api/tasks/:id:** Mark a specific task as completed or toggle its completion status.
  - **Path Parameter:** `:id` (the ID of the task to update).
  - **Optional Request Body:** `{"completed": true}` (to explicitly set completion status)
  - If no `completed` field is provided in the body, the task's completion status will be toggled.
- **DELETE /api/tasks/:id:** Remove a task from the list.
  - **Path Parameter:** `:id` (the ID of the task to delete).
- **In-Memory Storage:** Task data is stored in a JavaScript array and will reset when the server restarts.
- **"API is Running" Page:** A simple HTML page accessible at the root (`/`) to confirm the API is active and list available endpoints.

## Technologies Used

- **Node.js:** JavaScript runtime.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.

## Prerequisites

- Node.js (LTS version recommended) installed on your machine.

## How to Run

1.  **Clone this repository** (or create a new directory and copy the `app.js` file into it).
2.  **Navigate into the project directory** in your terminal/command prompt.
3.  **Install dependencies:**
    ```bash
    npm install express
    ```
4.  **Start the server:**
    ```bash
    node app.js
    ```
5.  The API will be running on `http://localhost:3000`. You will see console messages indicating the port.

## API Endpoints

Once the server is running, you can test the endpoints using tools like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl`.

| Method   | Endpoint         | Description                    | Request Body (Example)           |
| :------- | :--------------- | :----------------------------- | :------------------------------- |
| `GET`    | `/api/tasks`     | Retrieves all tasks.           | (None)                           |
| `POST`   | `/api/tasks`     | Adds a new task.               | `{"title": "Prepare dinner"}`    |
| `PUT`    | `/api/tasks/:id` | Marks/toggles task completion. | `{"completed": true}` (optional) |
| `DELETE` | `/api/tasks/:id` | Deletes a task by ID.          | (None)                           |

**Example `curl` commands:**

```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Add a new task
curl -X POST -H "Content-Type: application/json" -d '{"title": "Buy milk"}' http://localhost:3000/api/tasks

# Mark task with ID 1 as completed
curl -X PUT -H "Content-Type: application/json" -d '{"completed": true}' http://localhost:3000/api/tasks/1

# Toggle completion status of task with ID 2
curl -X PUT http://localhost:3000/api/tasks/2

# Delete task with ID 3
curl -X DELETE http://localhost:3000/api/tasks/3
```
