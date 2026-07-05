'use client';

import {
  DivTag,
} from '../Common/HTMLTags';

import './case-study-landing-style.css';

export default function CaseStudyLandingImpactBar({ data }) {
  console.log("ImpactBar Props:", data);

  // data அல்லது stats இல்லையென்றால் render செய்ய வேண்டாம்
  if (!data || !data.stats?.length) {
    return null;
  }

  const stats = data.stats || [];
  const class_name = data.class_name || '';
  const id = data.id || '';

  return (
    <DivTag
      className={`impact-bar-section ${class_name}`}
      id={id}
    >
      <DivTag className="impact-bar">
        {stats.map((stat, index) => (
          <DivTag key={index} className="impact-stat">
            <DivTag className="impact-num">
              {stat.number}
            </DivTag>

            <DivTag className="impact-label">
              {stat.label}
            </DivTag>
          </DivTag>
        ))}
      </DivTag>
    </DivTag>
  );
}