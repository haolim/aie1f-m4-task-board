import { useCallback, useEffect, useState } from "react";
import * as api from "./api";
import AddTaskForm from "./components/AddTaskForm";
import TaskColumn from "./components/TaskColumn";
import TaskDetail from "./components/TaskDetail";
import SearchBar from "./components/SearchBar";
import ErrorBanner from "./components/ErrorBanner";
import "./App.css";

const byId = (a, b) => a.id - b.id;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetches the task list. State is only set in the promise callbacks,
  // after the request finishes.
  const fetchTasks = useCallback(
    () =>
      api
        .getTasks()
        .then((data) => {
          setTasks([...data].sort(byId));
          setLoadError(null);
        })
        .catch((err) => setLoadError(err.message))
        .finally(() => setIsLoading(false)),
    [],
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRetry = () => {
    setIsLoading(true);
    fetchTasks();
  };

  // Puts the saved task from the API back into the list.
  const replaceTask = (saved) =>
    setTasks((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));

  // Runs one API call for a task. It shows any error in the banner.
  // It returns true when the call worked.
  const runAction = async (id, action) => {
    setBusyId(id);
    setActionError(null);
    try {
      await action();
      return true;
    } catch (err) {
      setActionError(err.message);
      return false;
    } finally {
      setBusyId(null);
    }
  };

  const handleAddTask = (newTask) =>
    runAction("new", async () => {
      const created = await api.createTask(newTask);
      setTasks((prev) => [...prev, created].sort(byId));
    });

  const handleCompleteTask = (id) =>
    runAction(id, async () => replaceTask(await api.completeTask(id)));

  const handleUpdateTask = (id, changes) =>
    runAction(id, async () => replaceTask(await api.updateTask(id, changes)));

  const handleDeleteTask = (id) =>
    runAction(id, async () => {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setSelectedId((prev) => (prev === id ? null : prev));
    });

  const handleSelectTask = (task) => {
    setSelectedId((prev) => (prev === task.id ? null : task.id));
  };

  const selectedTask = tasks.find((t) => t.id === selectedId) ?? null;

  const filteredTasks = tasks.filter((t) =>
    (t.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const isFiltering = searchTerm.length > 0;
  const pendingTasks = filteredTasks.filter((t) => !t.isCompleted);
  const completedTasks = filteredTasks.filter((t) => t.isCompleted);

  return (
    <div className="app">
      <header className="app-bar">
        <div>
          <h1 className="app-title">Task Board</h1>
          <p className="app-tagline">Tasks from the TaskFlow API.</p>
        </div>
        <div className="app-tools">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>
      </header>

      {loadError && (
        <ErrorBanner
          message={loadError}
          actionLabel={isLoading ? "Retrying…" : "Retry"}
          actionDisabled={isLoading}
          onAction={handleRetry}
        />
      )}
      {actionError && (
        <ErrorBanner
          message={actionError}
          actionLabel="Dismiss"
          onAction={() => setActionError(null)}
        />
      )}

      <div className="form-slot">
        <AddTaskForm onAdd={handleAddTask} isSaving={busyId === "new"} />
      </div>

      {tasks.length === 0 && (isLoading || loadError) ? (
        // Hide the empty board while loading or when the first load failed,
        // so "No tasks yet" never shows when the API simply can't be reached.
        isLoading && !loadError && (
          <p className="status-message">Loading tasks…</p>
        )
      ) : (
        <div className="board-layout">
          <div className="board">
            <TaskColumn
              title="Pending"
              tasks={pendingTasks}
              selectedId={selectedId}
              busyId={busyId}
              onSelect={handleSelectTask}
              onComplete={handleCompleteTask}
              isFiltering={isFiltering}
            />
            <TaskColumn
              title="Completed"
              tasks={completedTasks}
              selectedId={selectedId}
              busyId={busyId}
              onSelect={handleSelectTask}
              onComplete={handleCompleteTask}
              isFiltering={isFiltering}
            />
          </div>
          <div className="aside">
            <TaskDetail
              key={selectedTask?.id ?? "none"}
              task={selectedTask}
              isBusy={selectedTask != null && busyId === selectedTask.id}
              onComplete={handleCompleteTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
