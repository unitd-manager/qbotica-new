"use client";
import React from 'react';
import styles from './ready-to-run-work-differently.module.css';

export default function ReadyToRunWorkDifferently() {
  return (
    <section className={styles.finalCta}>
      <div className={styles.finalCtaInner}>
        <h2 className={styles.title}>Ready to run work differently?</h2>
        <p className={styles.subtitle}>
          See how qBotica can help your team operationalize Agentic AI across real business workflows.
        </p>
        <a className={styles.buttonPrimary} href="#">Request a Demo →</a>
      </div>
    </section>
  );
}
