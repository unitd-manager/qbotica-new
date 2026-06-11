import React from 'react';
import styles from '../Common/home-new.module.css';

const posts = [
  {
    category: 'News',
    title: 'qBotica Partners with Atolio',
    excerpt:
      'qBotica and Atolio have partnered to power AI agents with secure, instant access to enterprise knowledge, enabling smarter and more efficient enterprise automation.',
    link: 'https://www.qbotica.com/newsroom/qbotica-and-atolio-partner-to-power-ai-agents-with-secure-instant-access-to-enterprise-knowledge',
  },
  {
    category: 'Event',
    title: 'Agent Builders Day Chennai',
    excerpt:
      'Highlights from the qBotica and UiPath India event, where industry leaders explored the future of AI-powered automation, agentic AI, and enterprise transformation.',
    link: 'https://community.uipath.com/events/details/uipath-chennai-presents-agent-builders-day-chennai/',
  },
  {
    category: 'Event',
    title: 'How Agentic AI Doubles Your RPA Payoff',
    excerpt:
      'Listen to our discussion on how Agentic AI enhances traditional RPA initiatives, accelerates ROI, and unlocks greater business value.',
    link: 'https://vimeo.com/1123998656/0e6e0ea1e9',
  },
];

export default function LatestFromQbotica() {
  return (
    <section className={styles.newsSection}>
      <div className={styles.simpleHeader}>
        <div className={styles.sectionKickerPill}>Latest From QBotica</div>
      <h2>Building the future of enterprise execution.</h2>

<p>
  Explore the latest updates, insights, customer stories,
  and thought leadership from the qBotica team.
</p>
      </div>

     <div className={styles.newsGrid}>
  {posts.map((post, idx) => {
    // Use specific images for each card: 1st, 2nd, and 3rd respectively.
    let media = null;
    if (idx === 0) {
      media = <img src={'/assets/images/atol.jpeg'} alt={post.title} className={styles.newsMedia} />;
    } else if (idx === 1) {
      media = <img src={'/assets/images/uipathevent.jpeg'} alt={post.title} className={styles.newsMedia} />;
    } else if (idx === 2) {
      media = <img src={'/assets/images/event.jpeg'} alt={post.title} className={styles.newsMedia} />;
    } else {
      media = null;
    }

    return (
      <a
        key={idx}
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.newsCard}
      >
        <div className={styles.mediaWrap}>{media}</div>
        <div className={styles.newsCategory}>{post.category}</div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className={styles.readMore}>Read More →</span>
      </a>
    );
  })}
</div>
    </section>
  );
}
