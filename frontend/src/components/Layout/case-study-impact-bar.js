'use client';

import {
  DivTag,
} from '../Common/HTMLTags';

import './case-study-style.css';

export default function ImpactBar({ data }) {
  // exact copy fallbacks matching image_bc08f3.jpg
  const stats = data?.stats || [
    { num: '500+', label: 'Enterprise clients' },
    { num: '$2B+', label: 'Processes automated' },
    { num: '75%', label: 'Avg. cost reduction' },
    { num: '10×', label: 'Faster operations' },
    { num: '10+', label: 'Industries served' },
  ];

  const class_name = data?.class_name || '';
  const id = data?.id || '';

  return (
    <DivTag className={`impact-bar-section ${class_name}`} id={id}>
      {/* ══════ IMPACT NUMBERS STRIP ══════ */}
      <DivTag className="impact-bar">
        {stats.map((stat, index) => (
          <DivTag key={index} className="impact-stat">
            <DivTag className="impact-num">{stat.num}</DivTag>
            <DivTag className="impact-label">{stat.label}</DivTag>
          </DivTag>
        ))}
      </DivTag>
    </DivTag>
  );
}