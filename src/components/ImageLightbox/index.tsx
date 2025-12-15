import React, { useState, useEffect, useRef } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

type ImageLightboxProps = {
  src: string;
  alt?: string;
  title?: string;
};

export default function ImageLightbox({
  src,
  alt = "",
  title = "",
}: ImageLightboxProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageSrc = useBaseUrl(src);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // 只有點擊背景（overlay）本身時才關閉，點擊內容區域不關閉
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // 阻止事件冒泡到 overlay
    e.stopPropagation();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(5, scale + delta));
    setScale(newScale);
  };

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };


  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <img
        src={imageSrc}
        alt={alt}
        title={title}
        className={styles.thumbnail}
        onClick={handleClick}
        loading="lazy"
      />
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "圖片預覽"}
        >
          <div
            ref={contentRef}
            className={styles.content}
            onClick={handleContentClick}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setScale(1);
                setPosition({ x: 0, y: 0 });
              }}
              aria-label="關閉"
            >
              ×
            </button>
            <div className={styles.imageContainer}>
              <img
                ref={imageRef}
                src={imageSrc}
                alt={alt}
                title={title}
                className={styles.fullImage}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={handleDoubleClick}
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                }}
              />
            </div>
            {scale !== 1 && (
              <div className={styles.zoomInfo}>
                {Math.round(scale * 100)}%
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
