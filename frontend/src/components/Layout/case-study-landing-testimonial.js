'use client';

import { useEffect, useState } from 'react';
import { DivTag } from '../Common/HTMLTags';
import './case-study-landing-style.css';

export default function CaseStudyLandingTestimonials({ data }) {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    console.log('========== Testimonials ==========');
    console.log('Props Data:', data);
    console.log('Testimonials:', data?.testimonials);
  }, [data]);

  if (!data) return null;

  const { testimonials = [] } = data;

  return (
    <DivTag className="testimonial-band">
      <DivTag className="tb-inner">

        {testimonials.length > 0 ? (
          testimonials.map((item, index) => (
            <DivTag
              key={item.id || index}
              className={`tb-card ${
                activeCard === (item.id || index) ? 'expanded' : ''
              }`}
              onClick={() =>
                setActiveCard(
                  activeCard === (item.id || index)
                    ? null
                    : (item.id || index)
                )
              }
            >
              {/* Quote */}
              <DivTag className="tb-quote">
                {item.quote}
              </DivTag>

              {/* Author */}
              <DivTag className="tb-cite">
                <DivTag
                  className="tb-avatar"
                  style={{
                    backgroundColor:
                      item.avatar_background_color || '#0B1120',
                  }}
                >
                  {item.initials}
                </DivTag>

                <DivTag>
                  <DivTag className="tb-name">
                    {item.name}
                  </DivTag>

                  <DivTag className="tb-role">
                    {item.role}
                  </DivTag>
                </DivTag>
              </DivTag>
            </DivTag>
          ))
        ) : (
          <DivTag>No testimonials found.</DivTag>
        )}

      </DivTag>
    </DivTag>
  );
}