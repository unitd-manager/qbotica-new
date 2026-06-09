import styles from '@/components/Common/home-new.module.css';

export default function FinalCTASection() {
  return (
    <section className={`${styles.finalCta} finalCta`}>
      <div className={styles.finalCtaInner}>
        <h2>Ready to run work differently?</h2>
        <p>See how qBotica can help your team operationalize Agentic AI across real business workflows.</p>
        <a className={`${styles.buttonPrimary} ${styles.finalCtaButton}`} href="https://meetings.hubspot.com/automation-demo/scheduler">Request a Demo →</a>
      </div>
    </section>
  );
}
