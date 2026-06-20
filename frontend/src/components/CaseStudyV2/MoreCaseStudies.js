'use client';

import './MoreCaseStudies.css';

export default function MoreCaseStudies() {

  const studies = [

    {
      stat: "7x",
      label: "Faster Claims Processing",
      title: "How qBotica Increased Claims Processing By Over 7x for a Top Healthcare Client",
      industry: "Healthcare · Doqument AI"
    },

    {
      stat: "75%",
      label: "Processing Time Reduction",
      title: "How qBotica Helped a Global Top 10 Bank Reduce Processing Time by 75% and Errors by 90%",
      industry: "Financial Services · RPA"
    },

    {
      stat: "1M+",
      label: "Invoices Processed Annually",
      title: "How qBotica Helped a Fortune 500 Technology Company Process 1M+ Invoices Each Year",
      industry: "Manufacturing · AI Agents"
    }

  ];

  return (

    <section className="more-case-studies">

      <div className="more-case-container">

        <div className="more-case-header">

          <h2>

            More Case Studies

          </h2>

          <a
            href="https://www.qbdev.unitdtechnologies.com/case-studies"
            target="_blank"
            rel="noopener noreferrer"
          >

            View all stories →

          </a>

        </div>

        <div className="more-case-grid">

          {studies.map((item, index) => (

            <div
              className="more-case-card"
              key={index}
            >

              <div className="card-top-bar"></div>

              <div className="more-case-body">

                <h3>

                  {item.stat}

                </h3>

                <span className="case-stat-label">

                  {item.label}

                </span>

                <h4>

                  {item.title}

                </h4>

                <div className="case-footer">

                  <span>

                    • {item.industry}

                  </span>

                  <a
                    href="https://www.qbdev.unitdtechnologies.com/case-studies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    Read →

                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}