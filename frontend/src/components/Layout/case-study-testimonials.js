import React from 'react';
import { DivTag } from '../Common/HTMLTags';
import './case-study-style.css';

export default function Testimonials({ data }) {
  // Exact data from image_bd6cfa.jpg
  const testimonials = data?.testimonials || [
    {
      id: 1,
      stat: "7x faster claims",
      quote: "qBotica\'s document AI transformed what used to be a three-hour manual process into something that runs before our team arrives at their desks.",
      initials: "DO",
      avatarBg: "#FF7705",
      name: "Director of Operations",
      role: "Top Healthcare Provider"
    },
    {
      id: 2,
      stat: "75% time reduction",
      quote: "We went from a team buried in manual processing to one that reviews exceptions only. The ROI was visible within weeks of go-live.",
      initials: "VP",
      avatarBg: "#0B1120",
      name: "VP of Finance Operations",
      role: "Global Top 10 Bank"
    },
    {
      id: 3,
      stat: "500+ docs/day",
      quote: "This wasn\'t just automation — it was a complete rethinking of how our team handles vendor communication at scale. The difference is night and day.",
      initials: "OT",
      avatarBg: "#1D4ED8",
      name: "Operations Team",
      role: "Polaris Transportation Group"
    }
  ];

  return (
    <DivTag className="testimonial-band">
      <DivTag className="tb-inner">
        {testimonials.map((item) => (
          <DivTag key={item.id} className="tb-card">
            {/* Stat pill badge */}
            <DivTag className="tb-stat">{item.stat}</DivTag>
            
            {/* Quote block */}
            <DivTag className="tb-quote">{item.quote}</DivTag>
            
            {/* Author Citation Info */}
            <DivTag className="tb-cite">
              <DivTag 
                className="tb-avatar" 
                style={{ backgroundColor: item.avatarBg }}
              >
                {item.initials}
              </DivTag>
              <DivTag>
                <DivTag className="tb-name">{item.name}</DivTag>
                <DivTag className="tb-role">{item.role}</DivTag>
              </DivTag>
            </DivTag>
          </DivTag>
        ))}
      </DivTag>
    </DivTag>
  );
}