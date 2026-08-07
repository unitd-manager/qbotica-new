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
        "Their customer-centric approach, which combines best-in-class humans in the loop with a cloud-based delivery of a sophisticated machine learning platform, helped us scale delivery of pricing quotations at an astronomical speed with a potential to increase revenues for Polaris Transport while significantly reducing costs of operations. We are now able to deploy the staff onto other critical initiatives that were shelved for years, a true win-win for all",
      initials: "CTO",
      avatarBg: "#FF7705",
      name: "Dave Brajkovich",
      role: "CTO, Polaris Transport",
    },
    {
      id: 2,
      quote:
        "The qBotica team has always displayed a high-level of professionalism and the competency to bring real life and practical suggestions. These solutions have significantly transformed how we do business both from externally facing processes to back-office operations.",
      initials: "GHE",
      avatarBg: "#0B1120",
      name: "Global Head of Engineering",
      role: "Western Union",
    },
    {
      id: 3,
      quote:
        "We pointed Document Understanding at our client documents, told it what we were looking for, and it gave me a paragraph-long summary of everything I needed within just a couple of hours. That PoC was built in March, and by April we were in full production. We saved over 800 hours on this single process alone — and the work we've done here can be expanded far beyond it. This has taken away the data barrier on pursuing new opportunities, and that's huge for us.",
      initials: "BL",
      avatarBg: "#1D4ED8",
      name: "Deluxe — Kari Mesick",
      role: "Business Lead,Treasury Services",
    },
    {
      id: 4,
      quote:
        "The kind of information Kari needed typically requires an excruciating amount of manual effort — not just the volume, but the fact that the documents are filled with complex, unstructured information. Using generative AI, we didn't need to train models from scratch. The necessary pricing attributes could be extracted immediately, giving us a 99% faster time to value. With UiPath and qBotica, we don't have to exhaust our workforce with manual efforts — we're now energized and ready to deliver great customer experiences.",
      initials: "VP",
      avatarBg: "#0B1120",
      name: "Deluxe — Srinivas Nagarajan",
      role: "VP Product & Operations",
    },
    {
      id: 5,
      quote:
        "We had already begun our automation journey but knew we could achieve more with the right partner. qBotica's expertise and collaborative approach made it the ideal choice — their team understands our business and our culture. For the tasks we've automated, our team is 40% more productive and our clients benefit from our ability to focus on more strategic topics. The impact has been transformational.",
      initials: "CIO",
      avatarBg: "#1D4ED8",
      name: "Calvetti Ferguson-Karlen Alexander",
      role: "CIO",
    },
    {
      id: 6,
      quote:
        "The partnership between Calvetti Ferguson and qBotica goes beyond simply implementing technology — it's a true collaboration, with both teams working together to identify challenges, develop solutions, and drive continuous improvement. qBotica aren't just a vendor; they're a trusted advisor. From automating tax form preparation to streamlining client onboarding, we've seen tangible results across the business",
      initials: "P",
      avatarBg: "#FF7705",
      name: "Calvetti Fergusonh",
      role: "Partnership Testimonial",
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