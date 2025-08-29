import { JSX, useEffect, useRef } from "react";
import styles from "./styles.module.css";

type SvgDisplayProps = {
  svg: string;
  maxWidth?: string;
  backgroundColor?: string;
  darkMode?: boolean;
}

export default function SvgDisplay({ 
  svg, 
  maxWidth = "100%",
  backgroundColor = "transparent",
  darkMode = false
}: SvgDisplayProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current && svg) {
      const container = containerRef.current;
      container.innerHTML = svg;
      
      const svgElement = container.querySelector('svg');
      if (svgElement) {
        svgElement.style.width = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
        
        if (!svgElement.hasAttribute('viewBox')) {
          const width = svgElement.getAttribute('width') || '100';
          const height = svgElement.getAttribute('height') || '100';
          svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
        }
        
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
      }
    }
  }, [svg]);
  
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <>
      <div className={`${styles.svgDisplay} ${darkMode ? styles.darkMode : ''}`} style={{ maxWidth }}>
        <div 
          className={styles.svgContainer} 
          style={{ backgroundColor }}
        >
          <div 
            ref={containerRef}
            className={styles.svgWrapper}
            style={{ transform: `scale(1)` }}
          />
        </div>
      </div>
    </>
  );
}