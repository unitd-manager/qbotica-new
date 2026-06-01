"use client";

import { useState, useEffect } from "react";
import styles from "./Herosection.module.css";
import Image from 'next/image';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Structural Safety Shield: Renders a synchronized black container on the server 
  // to avoid mismatched HTML trees while the client bundle initializes.
  if (!mounted) {
    return (
      <section 
        style={{ backgroundColor: "#030712", minHeight: "100vh" }} 
        className={styles.heroContainer}
      />
    );
  }

  return (
    <section className={styles.heroContainer}>
      <div className={styles.ambientGlow} />

      <div className={styles.grid}>
        {/* LEFT COPY PANEL */}
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>Enterprise Agentic AI</span>
          </div>

          <h1 className={styles.heading}>
            Agentic AI <br />
            That Runs <br />
            <span className={styles.gradientText}>Your Business</span>
          </h1>

          <p className={styles.description}>
            Move beyond pilots and assistants. qBotica runs your enterprise
            operations using Agentic AI to execute end-to-end workflows across
            your systems, documents, and decisions.
          </p>

          <div className={styles.buttonRow}>
            <button className={styles.primaryBtn}>
              Request a Demo &rarr;
            </button>

            <button className={styles.secondaryBtn}>
              See Agentic AI In Action &rarr;
            </button>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricNumber}>10x</span>
              <span className={styles.metricLabel}>Efficiency</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricNumber}>500+</span>
              <span className={styles.metricLabel}>Workflows</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricNumber}>99.9%</span>
              <span className={styles.metricLabel}>Accuracy</span>
            </div>
          </div>
        </div>

        {/* RIGHT 3D GLOBAL LAYER MATRIX */}
        <div className={styles.visualContainer}>
          <div className={styles.cubeStage}>
            <div className={styles.threeDSpace}>
              {/* 3D Cube Core — six faces mapped to qbcomp.webp for a real cube look */}
              <div className={styles.cubeContainer}>
                <div className={`${styles.cubeFace} ${styles.faceFront}`} style={{ backgroundImage: "url('/assets/images/qbcomp.webp?v=2')" }} />
                <div className={`${styles.cubeFace} ${styles.faceBack}`} style={{ backgroundImage: "url('/assets/images/qbcomp.webp?v=2')" }} />
                <div className={`${styles.cubeFace} ${styles.faceLeft}`} style={{ backgroundImage: "url('/assets/images/qbcomp.webp?v=2')" }} />
                <div className={`${styles.cubeFace} ${styles.faceRight}`} style={{ backgroundImage: "url('/assets/images/qbcomp.webp?v=2')" }} />
                <div className={`${styles.cubeFace} ${styles.faceTop}`} style={{ backgroundImage: "url('/assets/images/qbcomp.webp?v=2')" }} />
                <div className={`${styles.cubeFace} ${styles.faceBottom}`} style={{ backgroundImage: "url('/assets/images/qbcomp.webp?v=2')" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}