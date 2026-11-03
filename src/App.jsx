import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskColumn from "./components/TaskColumn";
import TaskDetail from "./components/TaskDetail";
import SearchBar from "./components/SearchBar";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Design login page",
    description: "Create wireframes for the login screen.",
    priority: "high",
    status: "todo",
  },
  {
    id: 2,
    title: "Set up project repo",
    description: "Initialise Git repo and push initial commit.",
    priority: "medium",
    status: "done",
  },
  {
    id: 3,
    title: "Write API docs",
    description: "Document all REST endpoints.",
    priority: "low",
    status: "todo",
  },
  {
    id: 4,
    title: "Implement auth flow",
    description: "Build login and registration with JWT.",
    priority: "high",
    status: "inprogress",
  },
  {
    id: 5,
    title: "Fix navigation bug",
    description: "Sidebar collapses unexpectedly on mobile.",
    priority: "medium",
    status: "inprogress",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    console.log(newTask);
  };

  const handleMoveTask = (taskId) => {
    const nextStatus = {
      todo: "inprogress",
      inprogress: "done",
    };
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: nextStatus[t.status] } : t,
      ),
    );
  };

  const handleSelectTask = (task) => {
    setSelectedTask((prev) => (prev?.id === task.id ? null : task));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isFiltering = searchTerm.length > 0;

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === "inprogress",
  );
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  return (
    <div className="app">
      <div className="app-title">
        <h3>Task Board</h3>
      </div>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <AddTaskForm onAdd={handleAddTask}></AddTaskForm>
      <div className="board-layout">
        <div className="board">
          <TaskColumn
            title="To Do Tasks"
            tasks={todoTasks}
            onMove={handleMoveTask}
            onSelect={handleSelectTask}
            onDelete={handleDeleteTask}
            isFiltering={isFiltering}
          />
          <TaskColumn
            title="In Progress Tasks"
            tasks={inProgressTasks}
            onMove={handleMoveTask}
            onSelect={handleSelectTask}
            onDelete={handleDeleteTask}
            isFiltering={isFiltering}
          />
          <TaskColumn
            title="Done Tasks"
            tasks={doneTasks}
            onMove={handleMoveTask}
            onSelect={handleSelectTask}
            onDelete={handleDeleteTask}
            isFiltering={isFiltering}
          />
        </div>
        <div className="aside">
          <TaskDetail task={selectedTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
