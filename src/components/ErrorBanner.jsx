import styles from "./ErrorBanner.module.css";

export default function ErrorBanner({
  message,
  actionLabel,
  onAction,
  actionDisabled = false,
}) {
  return (
    <div className={styles.banner} role="alert">
      <p className={styles.message}>{message}</p>
      {onAction && (
        <button
          type="button"
          className={styles.action}
          onClick={onAction}
          disabled={actionDisabled}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
