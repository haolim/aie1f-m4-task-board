import styles from "./TaskCard.module.css";
import StatusBadge from "./StatusBadge";

export default function TaskCard({
  task,
  isSelected,
  isBusy,
  onSelect,
  onComplete,
}) {
  const handleKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(task);
    }
  };

  return (
    <div
      className={[
        styles.card,
        task.isCompleted ? styles.done : styles.pending,
        isSelected ? styles.selected : "",
      ].join(" ")}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(task)}
      onKeyDown={handleKeyDown}
    >
      <p className={styles.title}>{task.title}</p>
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}
      <div className={styles.meta}>
        <StatusBadge isCompleted={task.isCompleted} />
        {!task.isCompleted && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.complete}
              disabled={isBusy}
              onClick={(e) => {
                e.stopPropagation();
                onComplete(task.id);
              }}
            >
              {isBusy ? "Saving…" : "Mark complete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
