'use client';

import './Impact.css';
import { useState } from 'react';

export default function Impact() {

  const [showBenefits, setShowBenefits] = useState(false);

  const stats = [

    {
      value: '>90%',
      title: 'NOISE REMOVAL\nACCURACY'
    },

    {
      value: '500+',
      title: 'QUOTATIONS PER DAY'
    },

    {
      value: '100%',
      title: 'WORKFLOW AUTOMATED'
    }

  ];

  const benefits = [

    'Operations team reclaimed 3+ hours per day previously spent on manual email processing and data entry',

    'Vendor response turnaround reduced from hours to minutes on all standard quotation requests',

    'Scaled to 500+ daily documents without adding a single headcount — volume capacity effectively uncapped',

    'Error rate on data extraction dropped to near zero on structured cases, with complete audit trails on exceptions',

    'Human-in-the-loop design maintained expert oversight on edge cases without creating a new bottleneck'

  ];

  return (

    <section className="impact-section">

      <div className="impact-container">

        <span className="impact-label">
          THE IMPACT
        </span>

        <h2 className="impact-title">
          Numbers that changed
          <span>how Polaris operates</span>
        </h2>

        <p className="impact-description">

          Within weeks of deployment, the Polaris operations team stopped spending their mornings buried in email. The metrics tell part of the story — but the deeper impact was what the team could do with their time once the data entry was gone.

        </p>

        <div className="impact-stat-grid">

          {stats.map((item, index) => (

            <div
              className="impact-stat-card"
              key={index}
            >

              <h3>{item.value}</h3>

              <h4>

                {item.title.split('\n').map((line, i) => (

                  <span key={i}>
                    {line}
                    <br />
                  </span>

                ))}

              </h4>

            </div>

          ))}

        </div>

        <div className="impact-read-more">

  <button
    className="impact-btn"
    onClick={() => setShowBenefits((prev) => !prev)}
  >

   {showBenefits ? "Show Less" : "Read More"}

  </button>

</div>

{showBenefits && (

  <div className="impact-benefits">

    {benefits.map((item, index) => (

      <div
        className="impact-benefit"
        key={index}
      >

        <p>{item}</p>

      </div>

    ))}

  </div>

)}

  

      </div>

    </section>

  );

}