import styles from "./StatusBadge.module.css";

export default function StatusBadge({ isCompleted }) {
  return (
    <span
      className={`${styles.badge} ${isCompleted ? styles.done : styles.pending}`}
    >
      {isCompleted ? "Completed" : "Pending"}
    </span>
  );
}
