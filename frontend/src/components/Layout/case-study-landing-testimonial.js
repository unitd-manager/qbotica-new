'use client';

import { useEffect } from 'react';
import { DivTag } from '../Common/HTMLTags';
import './case-study-landing-style.css';

export default function CaseStudyLandingTestimonials({ data }) {
  useEffect(() => {
    console.log('========== Testimonials ==========');
    console.log('Props Data:', data);
    console.log('Testimonials:', data?.testimonials);

    if (data?.testimonials?.length > 0) {
      console.log('First Testimonial:', data.testimonials[0]);
    }
  }, [data]);

  if (!data) return null;

  const { testimonials = [] } = data;

  return (
    <DivTag className="testimonial-band">
      <DivTag className="tb-inner">

        {testimonials.length > 0 ? (
          testimonials.map((item, index) => {
            console.log('Rendering Testimonial:', item);

            return (
              <DivTag
                key={item.id || index}
                className="tb-card"
              >
                {/* Statistic */}
                <DivTag className="tb-stat">
                  {item.statistic}
                </DivTag>

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
            );
          })
        ) : (
          <DivTag>No testimonials found.</DivTag>
        )}

      </DivTag>
    </DivTag>
  );
}