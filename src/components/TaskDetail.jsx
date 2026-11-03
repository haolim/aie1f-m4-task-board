import styles from "./TaskDetail.module.css";

const priorityStyle = {
  high: styles.badgeHigh,
  low: styles.badgeLow,
  medium: styles.badgeMedium,
};

const statusLabel = {
  done: "Done",
  inprogress: "In Progress",
  todo: "To Do",
};
export default function TaskDetail({ task }) {
  if (!task) {
    return (
      <div className={styles.placeholder}>Click a task to view details.</div>
    );
  }
  return (
    <div className={styles.panel}>
      <div className={styles.heading}>Task Details</div>
      <h2 className={styles.title}>{task.title}</h2>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Priority</div>
          <p className={`${styles.badge} ${priorityStyle[task.priority]}`}>
            {task.priority}
          </p>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Status</div>
          <p className={styles.status}>{statusLabel[task.status]}</p>
        </div>
      </div>
    </div>
  );
}
