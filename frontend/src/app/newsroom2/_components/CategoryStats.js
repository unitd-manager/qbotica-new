import styles from './CategoryStats.module.css';
import { CATEGORY_STATS } from '../_data/categories';

// `stats` comes from the WP page "insights-news" -> ACF layout "insights_category_stats"
// (see src/lib/insight.js). Falls back to the static list until that's filled in.
export default function CategoryStats({ stats }) {
  const items = stats && stats.length > 0 ? stats : CATEGORY_STATS;

  return (
    <div className={styles.stats}>
      <div className={styles.statsInner}>
        {items.map((c) => (
          <div className={styles.stat} key={c.name}>
            <strong>{c.name}</strong>
            <span>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
