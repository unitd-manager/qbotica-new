'use client';

import { useEffect, useState, useRef } from 'react';
import { DivTag } from '../Common/HTMLTags';
import './case-study-landing-style.css';

export default function CaseStudyLandingTestimonials({ data }) {
  const [activeCard, setActiveCard] = useState(null);

  const trackRef = useRef(null);

  useEffect(() => {
    console.log('========== Testimonials ==========');
    console.log('Props Data:', data);
    console.log('Testimonials:', data?.testimonials);
  }, [data]);

  if (!data) return null;

  const { testimonials = [] } = data;

  const scrollLeft = () => {
    if (!trackRef.current) return;

    const card = trackRef.current.querySelector('.tb-card');
    if (!card) return;

    trackRef.current.scrollBy({
      left: -(card.offsetWidth + 24),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    if (!trackRef.current) return;

    const card = trackRef.current.querySelector('.tb-card');
    if (!card) return;

    trackRef.current.scrollBy({
      left: card.offsetWidth + 24,
      behavior: 'smooth',
    });
  };

  return (
    <DivTag className="testimonial-band">

      <DivTag className="tb-inner">

        <button
          className="tb-arrow tb-prev"
          onClick={scrollLeft}
          type="button"
        >
          &#10094;
        </button>

        <DivTag
          className="tb-track"
          ref={trackRef}
        >

          {testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <DivTag
                key={item.id || index}
                className={`tb-card ${
                  activeCard === (item.id || index)
                    ? 'expanded'
                    : ''
                }`}
                onClick={() =>
                  setActiveCard(
                    activeCard === (item.id || index)
                      ? null
                      : (item.id || index)
                  )
                }
              >

                <DivTag className="tb-quote">
                  {item.quote}
                </DivTag>

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

        <button
          className="tb-arrow tb-next"
          onClick={scrollRight}
          type="button"
        >
          &#10095;
        </button>

      </DivTag>

    </DivTag>
  );
}