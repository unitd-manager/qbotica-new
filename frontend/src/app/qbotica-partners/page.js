"use client";

import "./partners.css";

export default function QboticaPartners() {
  return (
    <main className="partners-page">
      {/* Hero Section */}
      <section className="partners-hero">
        <div className="partners-container">
          <h1>Build with the enterprise ecosystem.</h1>
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
              <h2>A connected ecosystem for enterprise transformation.</h2>
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
            <h2>Meet the partners powering qBotica&apos;s ecosystem</h2>
            <p>
              Atolio is highlighted as the newest partnership, followed by
              the strategic technologies supporting qBotica&apos;s AI-first approach.
            </p>
          </div>

          <div className="partners-grid">
            {/* Featured Card */}
            <div className="partner-card featured">
              <div className="partner-card-head" tabIndex={0}>
                <img
                  src="/images/atolio-ref.jpg"
                  alt="Atolio"
                  className="partner-card-image"
                />

                
                <div className="hover-panel">
                  <small>Solutions &amp; Applications</small>
                  <h3>Secure enterprise knowledge access</h3>
                  <div className="tags">
                    <span className="tag">Enterprise Search</span>
                    <span className="tag">Knowledge Management</span>
                    <span className="tag">AI-Powered Discovery</span>
                    <span className="tag">Knowledge Assistants</span>
                    <span className="tag">Cross-Application Search</span>
                    <span className="tag">Employee Productivity</span>
                  </div>
                </div>
              </div>

              <div className="partner-card-content">
                <h3>Secure enterprise knowledge access for AI agents and automation workflows.</h3>
                <p>
                  Atolio helps enterprises access knowledge across internal systems while preserving permissions, security, and control.


                </p>
                <div className="partner-note">
                  Together, qBotica and Atolio help organizations connect trusted enterprise knowledge to intelligent search, AI assistants, and automated workflows.

                </div>
              </div>
            </div>

            {/* UiPath */}
            <div className="partner-card">
              <div className="partner-card-head" tabIndex={0}>
                <img
                  src="/images/uipath-building.jpg"
                  alt="UiPath"
                  className="partner-card-image"
                />

                
                <div className="hover-panel">
                  <small>Solutions &amp; Applications</small>
                  <h3>Enterprise automation at scale</h3>
                  <div className="tags">
                    <span className="tag">RPA</span>
                    <span className="tag">Agentic Automation</span>
                    <span className="tag">Document Understanding</span>
                    <span className="tag">Process Mining</span>
                    <span className="tag">Test Automation</span>
                    <span className="tag">Managed Services</span>
                  </div>
                </div>
              </div>

              <div className="partner-card-content">
                <h3>Enterprise automation at scale</h3>
                <p>
                  UiPath supports automation programs across discovery, development, orchestration, document processing, testing, and ongoing operational support.


                </p>
                
              </div>
            </div>

            {/* AWS */}
            <div className="partner-card">
              <div className="partner-card-head" tabIndex={0}>
                <img
                  src="/images/aws-building.jpg"
                  alt="AWS"
                  className="partner-card-image"
                />

                
                <div className="hover-panel">
                  <small>Solutions &amp; Applications</small>
                  <h3>Cloud infrastructure for AI and automation</h3>
                  <div className="tags">
                    <span className="tag">Cloud Infrastructure</span>
                    <span className="tag">AI &amp; Machine Learning</span>
                    <span className="tag">Data Platforms</span>
                    <span className="tag">Serverless Applications</span>
                    <span className="tag">Cloud Migration</span>
                    <span className="tag">Application Modernization</span>
                  </div>
                </div>
              </div>

              <div className="partner-card-content">
                <h3>Scalable infrastructure for AI and automation.
</h3>
                <p>
                  AWS provides cloud infrastructure options that support AI deployment, data workflows, and enterprise-scale automation solutions.


                </p>
              </div>
            </div>

            {/* Microsoft */}
            <div className="partner-card">
              <div className="partner-card-head" tabIndex={0}>
                <img
                  src="/images/microsoft-campus.jpg"
                  alt="Microsoft"
                  className="partner-card-image"
                />

                
                <div className="hover-panel">
                  <small>Solutions &amp; Applications</small>
                  <h3>Enterprise cloud, productivity and AI</h3>
                  <div className="tags">
                    <span className="tag">AI Copilots</span>
                    <span className="tag">Azure Cloud</span>
                    <span className="tag">Microsoft 365</span>
                    <span className="tag">Power Platform</span>
                    <span className="tag">Data &amp; Analytics</span>
                    <span className="tag">Enterprise Security</span>
                  
                  </div>
                </div>
              </div>

              <div className="partner-card-content">
                <h3>Cloud-ready transformation foundations.
</h3>
                <p>
                  Microsoft technologies support enterprise applications, cloud platforms, productivity tools, and data environments.


                </p>
                
              </div>
            </div>

            {/* Anthropic */}
            <div className="partner-card">
              <div className="partner-card-head" tabIndex={0}>
                <img
                  src="/images/anthropic-office.jpg"
                  alt="Anthropic"
                  className="partner-card-image"
                />

                
                <div className="hover-panel">
                  <small>Solutions &amp; Applications</small>
                  <h3>Responsible generative AI for enterprise workflows
</h3>
                  <div className="tags">
                    <span className="tag">Claude</span>
                    <span className="tag">Generative AI</span>
                    <span className="tag">AI Agents</span>
                    <span className="tag">Knowledge Assistants</span>
                    <span className="tag">Natural Language Processing</span>
                    <span className="tag">Responsible AI</span>
                  </div>
                </div>
              </div>

              <div className="partner-card-content">
                <h3>Advanced AI capabilities for modern business workflows.
</h3>
                <p>
                  Anthropic contributes AI technologies that support intelligent agents, conversational experiences, and AI-powered automation initiatives.
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
          <h2>Ready to build with qBoticas ecosystem?</h2>
          <p>
            Bring together trusted platforms, intelligent automation,
            and AI technologies to solve complex business challenges.
          </p>
        </div>
      </section>
    </main>
  );
}