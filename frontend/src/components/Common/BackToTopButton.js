"use client";

import { useEffect, useState } from "react";
import styles from "./BackToTopButton.module.css";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.backToTop} ${
        visible ? styles.show : ""
      }`}
      aria-label="Back to Top"
    >
    <svg
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
>
  <path
    d="M12 19V5M12 5L5 12M12 5L19 12"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
    </button>
  );
}