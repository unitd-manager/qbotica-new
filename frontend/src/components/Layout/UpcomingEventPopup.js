'use client';

import { useState } from 'react';
import styles from '../Common/home-new.module.css';

export default function UpcomingEventPopup() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={styles.eventPopupWrapper} aria-live="polite" aria-label="Upcoming event popup">
      <div className={styles.eventPopupCard} role="dialog" aria-modal="false">
        <button
          type="button"
          className={styles.eventPopupClose}
          aria-label="Close event popup"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        <div className={styles.eventPopupBadge}>Upcoming Event</div>

        <h3 className={styles.eventPopupTitle}>
          Webinar: Building Secure AI Agents for the Enterprise
        </h3>

        <p className={styles.eventPopupMeta}>October 26th | 11:00 AM EDT</p>

        <button type="button" className={styles.eventPopupButton}>
          Save Your Spot <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
