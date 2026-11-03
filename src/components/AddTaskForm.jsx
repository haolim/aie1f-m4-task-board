import { useState } from "react";
import styles from "./AddTaskForm.module.css";

const generateTaskId = () => crypto.randomUUID;
const emptyForm = {
  title: "",
  description: "",
  priority: "low",
  status: "todo",
};

export default function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: generateTaskId(),
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
    });

    setForm(emptyForm);
    setShowAddForm(false);
  };

  return (
    <>
      {!showAddForm && (
        <button
          type="button"
          className={styles.submit}
          onClick={() => setShowAddForm(true)}
        >
          Add Task
        </button>
      )}
      {showAddForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={`${styles.field} ${styles.fieldWide}`}>
              <label className={styles.label} htmlFor="title">
                Title
              </label>
              <input
                className={styles.input}
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">
                Description
              </label>
              <textarea
                className={styles.textarea}
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="priority">
                Priority
              </label>
              <select
                className={styles.select}
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              Add Task
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => {
                setShowAddForm(false);
                setForm(emptyForm);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
