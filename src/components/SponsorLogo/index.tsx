import { JSX } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

type SponsorLogoProps = {
  standardSrc: string;
  whiteSrc: string;
  alt: string;
  maxWidth?: string;
};

export default function SponsorLogo({
  standardSrc,
  whiteSrc,
  alt,
  maxWidth = "300px",
}: SponsorLogoProps): JSX.Element {
  const standardUrl = useBaseUrl(standardSrc);
  const whiteUrl = useBaseUrl(whiteSrc);

  return (
    <div className={styles.container} style={{ maxWidth }}>
      <img
        src={standardUrl}
        alt={alt}
        className={styles.logo}
        data-theme="light"
      />
      <img
        src={whiteUrl}
        alt={alt}
        className={styles.logo}
        data-theme="dark"
      />
    </div>
  );
}
