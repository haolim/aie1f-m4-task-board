import styles from "./TaskColumn.module.css";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  title,
  tasks,
  selectedId,
  busyId,
  onSelect,
  onComplete,
  isFiltering,
}) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.count}>{tasks.length}</div>
      </div>
      {tasks.length === 0 ? (
        <div className={styles.empty}>
          {isFiltering
            ? "No tasks match your search."
            : `No ${title.toLowerCase()} tasks yet.`}
        </div>
      ) : (
        <ul className={styles.list}>
          {tasks.map((t) => (
            <li key={t.id}>
              <TaskCard
                task={t}
                isSelected={t.id === selectedId}
                isBusy={t.id === busyId}
                onSelect={onSelect}
                onComplete={onComplete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
