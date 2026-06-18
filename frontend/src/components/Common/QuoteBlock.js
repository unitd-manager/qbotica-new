import styles from './QuoteBlock.module.css';
import Link from 'next/link';

export default function QuoteBlock({ quote, author, role, href }) {
  const content = (
    <div className={styles.quoteCard}>
      <div className={styles.quoteMark} aria-hidden>
        “
      </div>
      <p className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quote }} />
      <div className={styles.meta}>
        <div className={styles.author}>{author}</div>
        {role && <div className={styles.role}>{role}</div>}
      </div>
    </div>
  );

  return (
    <section className={styles.quoteSection} aria-label="quote">
      {href ? (
        <Link href={href} className={styles.clickable}>
          {content}
        </Link>
      ) : (
        content
      )}
    </section>
  );
}
