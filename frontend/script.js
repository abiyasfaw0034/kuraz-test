document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("newTaskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  const filterAllButton = document.getElementById("filterAll");
  const filterActiveButton = document.getElementById("filterActive");
  const filterCompletedButton = document.getElementById("filterCompleted");

  // Hardcoded array of tasks
  let tasks = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Read a book", completed: true },
    { id: 3, title: "Walk the dog", completed: false },
  ];

  let currentFilter = "all"; // 'all', 'active', 'completed'

  // Function to render tasks to the DOM
  function renderTasks() {
    taskList.innerHTML = ""; // Clear existing tasks

    // Apply filter
    const filteredTasks = tasks.filter((task) => {
      if (currentFilter === "active") {
        return !task.completed;
      } else if (currentFilter === "completed") {
        return task.completed;
      }
      return true; // 'all' filter
    });

    if (filteredTasks.length === 0 && currentFilter !== "all") {
      const noTasksMessage = document.createElement("p");
      noTasksMessage.textContent = `No ${currentFilter} tasks to display.`;
      noTasksMessage.style.textAlign = "center";
      noTasksMessage.style.color = "#777";
      taskList.appendChild(noTasksMessage);
      return;
    } else if (filteredTasks.length === 0 && currentFilter === "all") {
      const noTasksMessage = document.createElement("p");
      noTasksMessage.textContent = "No tasks added yet.";
      noTasksMessage.style.textAlign = "center";
      noTasksMessage.style.color = "#777";
      taskList.appendChild(noTasksMessage);
      return;
    }

    filteredTasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.className = "task-item";
      if (task.completed) {
        listItem.classList.add("completed");
      }

      const taskTitleSpan = document.createElement("span");
      taskTitleSpan.className = "task-title";
      taskTitleSpan.textContent = task.title;
      taskTitleSpan.style.cursor = "pointer"; // Indicate clickability
      taskTitleSpan.addEventListener("click", () => toggleComplete(task.id));

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(task.id));

      listItem.appendChild(taskTitleSpan);
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    });

    updateFilterButtons(); // Update active filter button styling
  }

  // Function to add a new task with validation
  function addTask() {
    const title = newTaskInput.value.trim();

    // --- Validation ---
    if (title === "") {
      alert("Task title cannot be empty!");
      return;
    }
    if (title.length > 100) {
      // Example: Max length validation
      alert("Task title cannot exceed 100 characters!");
      return;
    }
    if (
      tasks.some((task) => task.title.toLowerCase() === title.toLowerCase())
    ) {
      // Example: Duplicate title validation
      alert("A task with this title already exists!");
      return;
    }
    // --- End Validation ---

    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    const newTask = {
      id: newId,
      title: title,
      completed: false,
    };

    tasks.push(newTask);
    newTaskInput.value = ""; // Clear input
    renderTasks(); // Re-render the list
  }

  // Function to toggle task completion status
  function toggleComplete(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks(); // Re-render the list
  }

  // Function to delete a task
  function deleteTask(id) {
    // Optional: Confirmation before deleting
    if (confirm("Are you sure you want to delete this task?")) {
      tasks = tasks.filter((task) => task.id !== id);
      renderTasks(); // Re-render the list
    }
  }

  // Function to set the current filter
  function setFilter(filterType) {
    currentFilter = filterType;
    renderTasks();
  }

  function updateFilterButtons() {
    filterAllButton.classList.remove("active");
    filterActiveButton.classList.remove("active");
    filterCompletedButton.classList.remove("active");

    if (currentFilter === "all") {
      filterAllButton.classList.add("active");
    } else if (currentFilter === "active") {
      filterActiveButton.classList.add("active");
    } else if (currentFilter === "completed") {
      filterCompletedButton.classList.add("active");
    }
  }

  // Event Listeners
  addTaskButton.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  filterAllButton.addEventListener("click", () => setFilter("all"));
  filterActiveButton.addEventListener("click", () => setFilter("active"));
  filterCompletedButton.addEventListener("click", () => setFilter("completed"));

  renderTasks();
});
