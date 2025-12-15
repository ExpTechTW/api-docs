import { JSX } from "react";
import styles from "./styles.module.css";

type GithubUserCardProps = {
  username: string;
  displayName?: string;
  description?: string;
};

export default function GithubUserCard({
  username,
  displayName,
  description,
}: GithubUserCardProps): JSX.Element {
  const avatarUrlSmall = `https://github.com/${username}.png?size=32`;
  const avatarUrlLarge = `https://github.com/${username}.png?size=128`;
  const profileUrl = `https://github.com/${username}`;

  return (
    <span className={styles.wrapper}>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.badge}
      >
        <img
          src={avatarUrlSmall}
          alt={`${username} avatar`}
          className={styles.avatarSmall}
        />
        <span className={styles.name}>{displayName || username}</span>
      </a>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.popup}
      >
        <div className={styles.card}>
          <img
            src={avatarUrlLarge}
            alt={`${username} avatar`}
            className={styles.avatarLarge}
          />
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{displayName || username}</div>
            <div className={styles.cardUsername}>@{username}</div>
            {description && (
              <div className={styles.cardDescription}>{description}</div>
            )}
          </div>
        </div>
      </a>
    </span>
  );
}
