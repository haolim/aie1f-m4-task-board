import styles from "./TaskCard.module.css";

const priorityStyle = {
  high: styles.badgeHigh,
  low: styles.badgeLow,
  medium: styles.badgeMedium,
};

export default function TaskCard({ task, onMove, onSelect, onDelete }) {
  return (
    <div
      className={`${styles.card} ${styles[task.priority]}`}
      onClick={() => onSelect(task)}
    >
      <p className={styles.title}>{task.title}</p>
      <div className={styles.meta}>
        <p className={`${styles.badge} ${priorityStyle[task.priority]}`}>
          Priority: {task.priority}
        </p>
        <div className={styles.actions}>
          {task.status !== "done" && (
            <button
              type="button"
              className={styles.move}
              onClick={(e) => {
                e.stopPropagation();
                onMove(task.id);
              }}
            >
              Move →
            </button>
          )}
          <button
            className={styles.delete}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm("Are you sure you want to delete this task?")
              ) {
                onDelete(task.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
