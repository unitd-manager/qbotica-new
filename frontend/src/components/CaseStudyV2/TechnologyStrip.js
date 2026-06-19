'use client';

import './TechnologyStrip.css';

export default function TechnologyStrip() {
  const technologies = [
    'DoqumentAI',
    'UiPath',
    'Microsoft Azure',
    'AWS',
  ];

  return (
    <section className="tech-strip">

      <div className="tech-container">

        <div className="tech-label">
          TECHNOLOGY POWERING THIS SOLUTION
        </div>

        <div className="tech-items">

          {technologies.map((item, index) => (

            <div
              className="tech-item"
              key={index}
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

