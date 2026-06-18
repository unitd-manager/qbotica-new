'use client';

import './Solution.css';

export default function Solution() {

  const solutions = [

  {
    icon: "📨",
    title: "Intelligent Email Parsing",
    description:
      "DocumentAI reads each incoming vendor email, identifies the relevant quotation request regardless of format, thread length, or embedded attachments — understanding context and intent, not just pattern-matching keywords.",
    tag: "AI-powered extraction",
  },

  {
    icon: "📉",
    title: "Advanced Noise Filtering",
    description:
      "Legal disclaimers, marketing signatures, forwarded thread history, and irrelevant content are identified and stripped away — isolating the signal from the noise with greater than 90% accuracy on real-world data.",
    tag: ">90% accuracy",
  },

  {
    icon: "⚙️",
    title: "Structured Data Transformation",
    description:
      "Extracted data — tracking numbers, routes, pricing inputs, special handling instructions — is validated against Polaris's business rules and transformed into standardized quotation formats ready for downstream processing.",
    tag: "Schema normalization",
  },

  {
    icon: "🤖",
    title: "End-to-End RPA Execution",
    description:
      "Robotic workflows take the structured output and generate ready-to-send quotations automatically — updating internal systems, triggering notifications, and logging activity with full audit trails, all without human intervention on standard cases.",
    tag: "Full automation",
  },

  {
    icon: "🧑‍💼",
    title: "Human-in-the-Loop for Edge Cases",
    description:
      "When DocumentAI encounters an exception it can't resolve with confidence, it escalates intelligently — routing to the right SME with a structured summary of what it found, what it attempted, and why it flagged the case for review.",
    tag: "Smart escalation",
  },

];

  return (

    <section className="solution-section">

      <div className="solution-container">

        <span className="solution-label">

          THE SOLUTION

        </span>

        <h2 className="solution-title">
          DocumentAI: Intelligent document
          <br />
          <span>execution from email to quotation</span>
        </h2>

        <div className="solution-description">

      <p>
      qBotica deployed <strong>DocumentAI</strong> — its AI-powered intelligent document
      processing solution — to rebuild the entire workflow from the ground up.
      Rather than trying to impose structure on chaotic inputs, DocumentAI was
      trained to work <em>within</em> the chaos: understanding language,
      inferring context, filtering noise, and extracting meaning from even the
      most inconsistent vendor emails.
      </p>

      <p>
      The result was a hybrid architecture that combined large language model
      understanding with deterministic business rule validation — scalable enough
      to handle volume spikes, accurate enough to operate without constant human
      review, and intelligent enough to know when to escalate.
      </p>

      </div>

        <div className="solution-list">

          {solutions.map((item, index) => (

            <div
              className="solution-card"
              key={index}
            >

              <div className="solution-icon">

                {item.icon}

              </div>

              <div className="solution-content">

                <h3>

                  {item.title}

                </h3>

                <p>

                  {item.description}

                </p>

                <span>

                  {item.tag}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}