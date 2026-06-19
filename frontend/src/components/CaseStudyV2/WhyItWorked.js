'use client';

import './WhyItWorked.css';

export default function WhyItWorked() {

  const items = [

    {
      icon: "🧠",
      title: "Understands intent, not patterns",
      description:
        "LLM reasoning extracts meaning from unstructured language — no templates or rigid field mappings required."
    },

    {
      icon: "📈",
      title: "Non-linear scale",
      description:
        "Processing 500 documents costs the same as 50. Volume increases don&apos;t require headcount increases."
    },

    {
      icon: "🛡️",
      title: "Business rule enforcement",
      description:
        "Deterministic validation on top of AI extraction ensures compliance and auditability on every processed document."
    },

    {
      icon: "🔄",
      title: "Managed service delivery",
      description:
        "qBotica owns the outcome — monitoring, tuning, and expanding automation as Polaris&apos;s operations evolve."
    }

  ];

  return (

    <section className="why-section">

      <div className="why-container">

        <span className="why-label">

          WHY DOCUMENT AI

        </span>

        <h2
          className="why-title"
          dangerouslySetInnerHTML={{
            __html:
              'Why DocumentAI where<br/><span>other approaches couldn&apos;t</span>',
          }}
        />

        <div className="why-description">

          <p>
            Most document processing tools perform well on clean, structured inputs.
            Polaris&apos;s email environment wasn&apos;t clean — it was accumulated years of
            inconsistent vendor templates, legacy formatting, long forwarded chains,
            and edge cases that broke every rule-based system the team had tried before.
          </p>

          <p>
            DocumentA&apos;s hybrid approach — combining large language model contextual
            understanding with deterministic validation rules — gave Polaris something
            purely template-based systems can&apos;t offer: the ability to understand
            <em> intent</em>, not just match patterns. That&apos;s what made 90%+ noise
            removal achievable on real-world, production data.
          </p>

        </div>

        <div className="why-grid">

          {items.map((item, index) => (

            <div
              className="why-card"
              key={index}
            >

              <div className="why-icon">

                {item.icon}

              </div>

              <h3>

                {item.title}

              </h3>

              <p>

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}