import styles from "./SearchBar.module.css";

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <input
      className={styles.search}
      type="search"
      aria-label="Search tasks by title"
      placeholder="Search by task title"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
