import { JSX } from "react";
import styles from "./styles.module.css";

type StatusType = "investigating" | "resolved";

type StatusBadgeProps = {
  status: StatusType;
  title?: string;
  children?: string;
}

const statusLabels: Record<StatusType, string> = {
  investigating: "調查中",
  resolved: "已結案"
};

export default function StatusBadge({
  status,
  title = "狀態",
  children
}: StatusBadgeProps): JSX.Element {
  const label = children || statusLabels[status];

  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.indicator} />
      <span className={styles.title}>{title}</span>
      <span className={styles.divider} />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
