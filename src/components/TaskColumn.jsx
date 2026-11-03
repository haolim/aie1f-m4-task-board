import styles from "./TaskColumn.module.css";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  title,
  tasks,
  onMove,
  onSelect,
  onDelete,
  isFiltering,
}) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.count}>{tasks.length}</div>
      </div>
      {tasks.length === 0 ? (
        <div className={styles.empty}>
          {isFiltering
            ? "No tasks match your search criteria."
            : "No tasks have been added yet."}
        </div>
      ) : (
        <ul className={styles.list}>
          {tasks.map((t) => (
            <li key={t.id}>
              <TaskCard
                task={t}
                onMove={onMove}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
