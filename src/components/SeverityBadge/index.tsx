import { JSX } from "react";
import styles from "./styles.module.css";

type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

type SeverityBadgeProps = {
  level: SeverityLevel;
  title?: string;
  children?: string;
}

const severityLabels: Record<SeverityLevel, string> = {
  critical: "嚴重",
  high: "高",
  medium: "中",
  low: "低",
  info: "資訊"
};

export default function SeverityBadge({
  level,
  title = "嚴重程度",
  children
}: SeverityBadgeProps): JSX.Element {
  const label = children || severityLabels[level];

  return (
    <span className={`${styles.badge} ${styles[level]}`}>
      <span className={styles.indicator} />
      <span className={styles.title}>{title}</span>
      <span className={styles.divider} />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
