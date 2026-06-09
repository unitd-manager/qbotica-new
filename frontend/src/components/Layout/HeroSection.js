"use client";
import { useState, useEffect } from "react";
import styles from "./Herosection.module.css";
import Image from "next/image";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const DEMO_LINK = "https://meetings.hubspot.com/automation-demo/scheduler";

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {/* ── LEFT COPY PANEL ── */}
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
            <a
              className={styles.primaryBtn}
              href="#interactive"
            >
             Explore the Execution Model →
            </a>
            <a
              className={styles.secondaryBtn}
              href="#client-highlight"
            >
              See Enterprise Results →
            </a>
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

        {/* ── RIGHT — REALISTIC TRANSPARENT GLOBE WITH DENSE DOT NETWORKS ── */}
        <div className={styles.visualContainer}>
          <div className={styles.globeStage}>
            
            {/* Ambient Base Light Glow */}
            <div className={styles.globeHalo} />

            {/* CORE BASE GLOBE SHELL */}
            <div className={styles.globeShell}>
              <div className={`${styles.geoLine} ${styles.lon1}`} />
              <div className={`${styles.geoLine} ${styles.lon2}`} />
              <div className={`${styles.geoLine} ${styles.lon3}`} />
              <div className={`${styles.geoLine} ${styles.lon4}`} />
              <div className={`${styles.geoLine} ${styles.lat1}`} />
              <div className={`${styles.geoLine} ${styles.lat2}`} />
              <div className={`${styles.geoLine} ${styles.lat3}`} />
            </div>

            {/* DENSE DOTTED NETWORK SHELL A (Spins Clockwise) */}
            <div className={styles.globeShellDottedA}>
              <div className={`${styles.geoLineDotted} ${styles.dotLon1}`} />
              <div className={`${styles.geoLineDotted} ${styles.dotLon2}`} />
              <div className={`${styles.geoLineDotted} ${styles.dotLon3}`} />
              <div className={`${styles.geoLineDotted} ${styles.dotLat1}`} />
              <div className={`${styles.geoLineDotted} ${styles.dotLat2}`} />
            </div>

            {/* DENSE DOTTED NETWORK SHELL B (Spins Counter-Clockwise for Deep Volumetric Intersection) */}
            <div className={styles.globeShellDottedB}>
              <div className={`${styles.geoLineDottedAlt} ${styles.dotLon4}`} />
              <div className={`${styles.geoLineDottedAlt} ${styles.dotLon5}`} />
              <div className={`${styles.geoLineDottedAlt} ${styles.dotLon6}`} />
              <div className={`${styles.geoLineDottedAlt} ${styles.dotLat3}`} />
              <div className={`${styles.geoLineDottedAlt} ${styles.dotLat4}`} />
            </div>

            {/* Outer Cosmic Framing Rings */}
            <div className={`${styles.ring} ${styles.ringLarge}`} />
            <div className={`${styles.ring} ${styles.ringMid}`} />

            {/* Static Volumetric Glass Rim Shading Layer */}
            <div className={styles.globeBorder} />

            {/* Kinetic Orbital Streams */}
            <div className={styles.orbitBlue}>
              <div className={styles.glowingNode} />
            </div>
            <div className={styles.orbitOrange} />

            {/* FLOATING TRANSPARENT CORPORATE LOGO */}
            <div className={styles.logoWrapper}>
              <Image 
                src="/assets/images/qbcomp.webp?v=2" 
                alt="qBotica Logo" 
                width={130} 
                height={130}
                priority
              />
            </div>

            <div className={styles.globeStats}>
              <div className={`${styles.globeStatCard} ${styles.statTopLeft}`}>
                <span className={styles.statNumber}>10x</span>
                <span className={styles.statLabel}>Efficiency</span>
              </div>
              <div className={`${styles.globeStatCard} ${styles.statTopRight}`}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Workflows</span>
              </div>
              <div className={`${styles.globeStatCard} ${styles.statBottomCenter}`}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.heroGradient} />
    </section>
  );
}