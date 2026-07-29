import styles from './CategoryStats.module.css';
import { CATEGORY_STATS } from '../_data/categories';

export default function CategoryStats() {
  return (
    <div className={styles.stats}>
      <div className={styles.statsInner}>
        {CATEGORY_STATS.map((c) => (
          <div className={styles.stat} key={c.name}>
            <strong>{c.name}</strong>
            <span>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
