import { useState } from "react";
import styles from "./AddTaskForm.module.css";

const emptyForm = {
  title: "",
  description: "",
};

export default function AddTaskForm({ onAdd, isSaving }) {
  const [form, setForm] = useState(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    // The API assigns the id. Only clear the form once the task is saved,
    // so nothing is lost if the API can't be reached.
    const ok = await onAdd({
      title,
      description: form.description.trim(),
    });
    if (ok) {
      setForm(emptyForm);
      setShowAddForm(false);
    }
  };

  if (!showAddForm) {
    return (
      <button
        type="button"
        className={styles.submit}
        onClick={() => setShowAddForm(true)}
      >
        Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.legend}>New task</p>
      <div className={styles.grid}>
        <div className={styles.field}>
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
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            Description <span className={styles.hint}>(optional)</span>
          </label>
          <textarea
            className={styles.textarea}
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          disabled={isSaving || !form.title.trim()}
        >
          {isSaving ? "Saving…" : "Add Task"}
        </button>
        <button
          type="button"
          className={styles.cancel}
          disabled={isSaving}
          onClick={() => {
            setShowAddForm(false);
            setForm(emptyForm);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
