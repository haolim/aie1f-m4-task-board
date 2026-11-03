import { useState } from "react";
import styles from "./TaskDetail.module.css";
import StatusBadge from "./StatusBadge";

// App renders this with key={task.id}, so the edit state resets
// whenever a different task is selected.
export default function TaskDetail({
  task,
  isBusy,
  onComplete,
  onUpdate,
  onDelete,
  onClose,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  if (!task) {
    return (
      <div className={styles.placeholder}>Click a task to view details.</div>
    );
  }

  const startEditing = () => {
    setForm({
      title: task.title ?? "",
      description: task.description ?? "",
      isCompleted: Boolean(task.isCompleted),
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return;
    const ok = await onUpdate(task.id, {
      title,
      description: form.description.trim(),
      isCompleted: form.isCompleted,
    });
    if (ok) setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
      onDelete(task.id);
    }
  };

  if (isEditing) {
    return (
      <form className={styles.panel} onSubmit={handleSave}>
        <div className={styles.heading}>Edit Task #{task.id}</div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="edit-title">
            Title
          </label>
          <input
            className={styles.input}
            id="edit-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="edit-description">
            Description
          </label>
          <textarea
            className={styles.textarea}
            id="edit-description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="isCompleted"
            checked={form.isCompleted}
            onChange={handleChange}
          />
          Completed
        </label>
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.primary}
            disabled={isBusy || !form.title.trim()}
          >
            {isBusy ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => setIsEditing(false)}
            disabled={isBusy}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.headingRow}>
        <div className={styles.heading}>Task #{task.id}</div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>
      </div>
      <h2 className={styles.title}>{task.title}</h2>
      <p className={styles.description}>
        {task.description || <span className={styles.muted}>No description.</span>}
      </p>
      <div className={styles.meta}>
        <div className={styles.metaLabel}>Status</div>
        <StatusBadge isCompleted={task.isCompleted} />
      </div>
      <div className={styles.actions}>
        {!task.isCompleted && (
          <button
            type="button"
            className={styles.primary}
            onClick={() => onComplete(task.id)}
            disabled={isBusy}
          >
            Mark complete
          </button>
        )}
        <button
          type="button"
          className={styles.secondary}
          onClick={startEditing}
          disabled={isBusy}
        >
          Edit
        </button>
        <button
          type="button"
          className={styles.danger}
          onClick={handleDelete}
          disabled={isBusy}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
