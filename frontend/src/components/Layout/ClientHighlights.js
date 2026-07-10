import React from 'react';
import styles from '../../components/Common/home-new.module.css';
import Link from 'next/link';

export default function ClientHighlights() {
  return (
    <section className={styles.clientSection} id="client-highlight">
      <div className={styles.clientWrapper}>
        <div>
          <div className={styles.videoCard}>
            <div className={styles.videoFrame}>
              <iframe
  src="https://player.vimeo.com/video/895862411"
  title="Client Video Statement"
  width="100%"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
/>
            </div>
            <div className={styles.videoLabel}>
              <div className={styles.videoLabelLeft}>
                <img
                  src="https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/polaris.webp"
                  alt="Polaris"
                  className={styles.clientLogo}
                />
              </div>
              <div className={styles.videoLabelRight}>
                <div className={styles.clientIndustry} aria-label="Industry: Transportation">
                  <span className={styles.clientIndustryLabel}>Industry :</span>
                  <span className={styles.clientIndustryValue}>Transportation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.clientCopy}>
          <div className={styles.sectionKickerPill}>Client Highlight</div>
          <h2>Enterprise execution at scale</h2>
          <p>This isn’t experimentation. This is operational execution inside real enterprise environments.
          qBotica helps organizations reduce manual effort, accelerate workflows, improve visibility, and scale execution across business-critical processes.</p>

          <div className={styles.proofList}>
            <div className={styles.proofItem}><span>✓</span><div>Faster processing across core operations</div></div>
            <div className={styles.proofItem}><span>✓</span><div>Reduced manual effort and operational cost</div></div>
            <div className={styles.proofItem}><span>✓</span><div>Improved accuracy, consistency, and control</div></div>
            <div className={styles.proofItem}><span>✓</span><div>Governance and human oversight built in</div></div>
          </div>

          <div className={styles.clientCtas}>
            <Link className={styles.buttonPrimary} href="/case-studies/how-qbotica-helped-a-transportation-supply-chain-company-scale-to-500-documents-processed-daily-with-ai">Explore the case study →</Link>
            <Link className={styles.buttonPrimary} href="/case-studies">Explore more case studies →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
