'use client';

import React, { useState } from 'react';
import { DivTag } from '../Common/HTMLTags';
import './case-study-style.css';

export default function Testimonials({ data }) {
  const [activeCard, setActiveCard] = useState(null);

  const testimonials = data?.testimonials || [
    {
      id: 1,
      quote:
        "Their customer-centric approach, which combines best-in-class humans in the loop with a cloud-based delivery of a sophisticated machine learning platform, helped us scale delivery of pricing quotations at an astronomical speed with a potential to increase revenues for Polaris Transport while significantly reducing costs of operations. We are now able to deploy the staff onto other critical initiatives that were shelved for years, a true win-win for all.",
      initials: "DB",
      avatarBg: "#FF7705",
      name: "Dave Brajkovich",
      role: "CTO, Polaris Transport",
    },
    {
      id: 2,
      quote:
        "The qBotica team has always displayed a high-level of professionalism and the competency to bring real life and practical suggestions. These solutions have significantly transformed how we do business both from externally facing processes to back-office operations.",
      initials: "GE",
      avatarBg: "#0B1120",
      name: "Global Head of Engineering",
      role: "Western Union",
    },
    {
      id: 3,
      quote:
        "There's been a tremendous amount of effort saved in building the necessary features from scratch to enable intelligent document processing and seamless human-robot collaboration.",
      initials: "CTO",
      avatarBg: "#1D4ED8",
      name: "Chief Transformation Officer",
      role: "Large Manufacturing Client",
    },
  ];

  const toggleCard = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  return (
    <DivTag className="testimonial-band">
      <DivTag className="tb-inner">
        {testimonials.map((item) => (
          <DivTag
  key={item.id}
  className={`tb-card ${activeCard === item.id ? "expanded" : ""}`}
  onClick={() =>
    setActiveCard(activeCard === item.id ? null : item.id)
  }
>
            

            <DivTag className="tb-quote">
              {item.quote}
            </DivTag>

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