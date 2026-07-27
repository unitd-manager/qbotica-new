import React from 'react';
import styles from '../Common/home-new.module.css';

const posts = [
  {
    category: 'News',
    title: 'qBotica Partners with Atolio',
    excerpt:
      'qBotica and Atolio have partnered to power AI agents with secure, instant access to enterprise knowledge, enabling smarter and more efficient enterprise automation.',
    link: 'https://www.qbotica.com/atolio-partnership',
  },
 
  {
    category: 'Event',
    title: 'Agent Builders Day Chennai',
    excerpt:
      'Highlights from the qBotica and UiPath India event, where industry leaders explored the future of AI-powered automation, agentic AI, and enterprise transformation.',
    link: 'https://www.linkedin.com/posts/maheshvinayagam_qubi-qbotica-qubiagents-ugcPost-7469722247503740928-XXWj/?utm_source=share&utm_medium=member_android&rcm=ACoAABVRbdkBq5-v8rybi3syfWBj2yxsbqLR0JA',
  },
  {
    category: 'News',
    title: 'qBotica acquires Automatiga',
    excerpt:
      'qBotica’s acquisition of Automatiga and the launch of the ‘qubi’ platform give enterprises secure, instant access to organizational knowledge—driving AI-powered efficiency across all functions.',
    link: 'https://www.qbotica.com/automatiga-acquisition',
  },
];

export default function LatestFromQbotica() {
  return (
    <section className={styles.newsSection}>
      <div className={styles.simpleHeader}>
        <div className={styles.sectionKickerPill}>Latest From QBotica</div>
      <h2>Building the future of enterprise execution</h2>

<p>
  Explore the latest updates, insights, customer stories,
  and thought leadership from the qBotica team.
</p>
      </div>

     <div className={styles.newsGrid}>
  {posts.map((post, idx) => {
    // Use specific images for each card: 1st, 3rd, and 4th respectively.
    let media = null;
    if (idx === 0) {
      media = <img src={'/assets/images/atol.jpeg'} alt={post.title} className={styles.newsMedia} />;
    } else if (idx === 1) {
      media = <img src={'/assets/images/uipathevent.jpeg'} alt={post.title} className={styles.newsMedia} />;
    } else if (idx === 2) {
      media = <img src={'/assets/images/automat.png'} alt={post.title} className={styles.newsMedia} />;
    } else {
      media = null;
    }

    const isExternal = /^https?:\/\//.test(post.link);

    return (
      <a
        key={idx}
        href={post.link}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
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
