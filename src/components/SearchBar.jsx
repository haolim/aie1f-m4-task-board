import styles from "./SearchBar.module.css";

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search by task title"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
