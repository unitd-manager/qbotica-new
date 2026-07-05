'use client';

import './WhyItWorked.css';
export default function WhyItWorked() {
  

  const items = [
    {
      title: "Understands intent, not patterns",
      description:
        "LLM reasoning extracts meaning from unstructured language — no templates or rigid field mappings required."
    },
    {
      title: "Non-linear scale",
      description:
        "Processing 500 documents costs the same as 50. Volume increases don't require headcount increases."
    },
    {
      title: "Business rule enforcement",
      description:
        "Deterministic validation on top of AI extraction ensures compliance and auditability on every processed document."
    },
    {
      title: "Managed service delivery",
      description:
        "qBotica owns the outcome — monitoring, tuning, and expanding automation as Polaris's operations evolve."
    }
  ];

  return (
    <section className="why-section">
      <div className="why-container">

        <span className="why-label">
          WHY DOQUMENT AI
        </span>

        <h2
          className="why-title"
          dangerouslySetInnerHTML={{
            __html:
              'Why DoqumentAI where<br/><span>other approaches couldn&apos;t</span>',
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
            DoqumentAI&apos;s hybrid approach — combining large language model contextual
            understanding with deterministic validation rules — gave Polaris something
            purely template-based systems can&apos;t offer: the ability to understand
            <em> intent</em>, not just match patterns. That&apos;s what made 90%+ noise
            removal achievable on real-world, production data.
          </p>
        </div>

       
        <div className="why-grid">
  {items.map((item, index) => (
    <div className="why-card" key={index}>
      <div className="why-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}