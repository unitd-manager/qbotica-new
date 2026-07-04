"use client";

import "./partners.css";

export default function QboticaPartners() {
  return (
    <main className="partners-page">

      {/* Hero Section */}

      <section className="partners-hero">

        <div className="partners-container">

          <h1>
            Build with the enterprise ecosystem.
          </h1>

          <p>
            qBotica works across leading platforms and technologies to
            deliver intelligent automation, Agentic AI, enterprise cloud
            solutions, and secure AI experiences.
          </p>

        </div>

      </section>
      {/* =========================================
    PARTNER STRIP
========================================= */}

<section className="partner-strip">

  <div className="partners-container">

    <div className="partner-strip-card">

      <div className="partner-strip-left">

        <h2>
          A connected ecosystem for enterprise transformation.
        </h2>

        <p>
          The partner page expands the homepage partner section by
          introducing each relationship and explaining how it supports
          qBotica&apos;s AI and automation strategy.
        </p>

      </div>

     <div className="partner-logos">

  <div className="partner-logo">
    <img
      src="/images/atolioo.png"
      alt="Atolio"
      className="partner-logo-img atolio-logo"
    />
  </div>

  <div className="partner-logo">
    <img
      src="/images/uipath.webp"
      alt="UiPath"
      className="partner-logo-img"
    />
  </div>

  <div className="partner-logo">
    <img
      src="/images/aws-1-1.webp"
      alt="AWS"
      className="partner-logo-img"
    />
  </div>

  <div className="partner-logo">
    <img
      src="/images/microsoft.png"
      alt="Microsoft"
      className="partner-logo-img"
    />
  </div>

  <div className="partner-logo">
    <img
      src="/images/anthrotext.png"
      alt="Anthropic"
      className="partner-logo-img anthropic-logo"
    />
  </div>
</div>
</div>
</div>
</section>
{/* ==========================================================
    PARTNERS SECTION
========================================================== */}

<section className="partners-showcase">

    <div className="partners-container">

        <div className="partners-heading">

            <h2>
                Meet the partners powering qBotica&apos;s ecosystem
            </h2>

            <p>
                Atolio is highlighted as the newest partnership, followed by
                the strategic technologies supporting qBotica&apos;s AI-first approach.
            </p>

        </div>

        <div className="partners-grid">

            {/* Featured Card */}

            <div className="partner-card featured">

                <div className="partner-card-head">

                    <div className="partner-name">
                        atolio
                    </div>

                </div>

                <div className="partner-card-content">

                    <h3>
                        Secure enterprise knowledge access for AI
                        <br />
                        agents and automation workflows.
                    </h3>

                    <p>
                        Atolio helps enterprises access knowledge across internal systems while preserving permissions, security, and control.
                    </p>

                    <div className="partner-note">

                        Additional partnership details can be added after the development team provides technical information.

                    </div>

                </div>

            </div>

            {/* UiPath */}

            <div className="partner-card">

                <div className="partner-card-head">

                    <div className="partner-name">
                        UiPath
                    </div>

                </div>

                <div className="partner-card-content">

                    <h3>
                        Enterprise automation at scale.
                    </h3>

                    <p>
                        UiPath supports automation programs across discovery,
                        development, orchestration, document processing,
                        testing, and ongoing operational support.
                    </p>

                </div>

            </div>

            {/* AWS */}

            <div className="partner-card">

                <div className="partner-card-head">

                    <div className="partner-name">
                        AWS
                    </div>

                </div>

                <div className="partner-card-content">

                    <h3>
                        Scalable infrastructure for AI and automation.
                    </h3>

                    <p>
                        AWS provides cloud infrastructure options that support AI deployment,data workflows, and
                        enterprise-scale automation solutions.

                    </p>

                </div>

            </div>

            {/* Microsoft */}

            <div className="partner-card">

                <div className="partner-card-head">

                    <div className="partner-name">
                        Microsoft
                    </div>

                </div>

                <div className="partner-card-content">

                    <h3>
                        Cloud-ready transformation <br />
                        foundations.
                    </h3>

                    <p>
                        Microsoft technologies support enterprise applications,
                        cloud platforms, productivity tools, and data environments.

                    </p>

                </div>

            </div>

            {/* Anthropic */}

            <div className="partner-card">

                <div className="partner-card-head">

                    <div className="partner-name">
                        ANTHROPIC
                    </div>

                </div>

                <div className="partner-card-content">

                    <h3>
                        Advanced AI capabilities for modern business workflows.
                    </h3>

                    <p>
                        Anthropic contributes AI technologies that support intelligent
                        agents, conversational experiences, and AI-powered automation initiatives.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>
{/* ==========================================================
    CTA SECTION
========================================================== */}

<section className="partners-cta">

    <div className="partners-container">

        <h2>
            Ready to build with qBoticas ecosystem?
        </h2>

        <p>
            Bring together trusted platforms, intelligent automation,
            and AI technologies to solve complex business challenges.
        </p>

    </div>

</section>

    </main>
  );
}