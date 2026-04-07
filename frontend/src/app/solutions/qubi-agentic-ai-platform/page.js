"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  Calculator,
  Database,
  DollarSign,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  Globe,
  HandMetal,
  Headphones,
  Layers,
  LineChart,
  Lock,
  Menu,
  MessageSquare,
  Monitor,
  Paintbrush,
  PenTool,
  Play,
  Plug,
  Rocket,
  Scaling,
  Search,
  Shield,
  ShieldCheck,
  TrendingUp,
  Unlink,
  UserCheck,
  UserCog,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#capabilities" },
  { label: "Capabilities", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Resources", href: "#analytics" },
  { label: "Contact", href: "#final-cta" },
];

const problems = [
  { icon: Unlink, label: "Disconnected systems" },
  { icon: HandMetal, label: "Manual handoffs" },
  { icon: AlertTriangle, label: "Exception-heavy workflows" },
  { icon: Eye, label: "Limited visibility" },
  { icon: Scaling, label: "Difficulty scaling automation" },
];

const capabilities = [
  { icon: Paintbrush, title: "Design", description: "Build automations and AI-powered workflows with low-code tools." },
  { icon: Layers, title: "Orchestrate", description: "Coordinate bots, agents, systems, and workloads from one control layer." },
  { icon: Plug, title: "Integrate", description: "Connect enterprise systems, apps, data, and AI services seamlessly." },
  { icon: Users, title: "Collaborate", description: "Bring humans into the loop when judgment or approvals are required." },
  { icon: BarChart3, title: "Optimize", description: "Measure performance, ROI, and operational impact in real time." },
  { icon: ShieldCheck, title: "Support & Govern", description: "Manage access, support issues, and enterprise reliability at scale." },
];

const outcomes = [
  { icon: Zap, title: "Faster cycle times", description: "Accelerate end-to-end process completion" },
  { icon: DollarSign, title: "Lower operating cost", description: "Reduce manual effort and rework" },
  { icon: TrendingUp, title: "Better productivity", description: "Free teams for higher-value work" },
  { icon: Shield, title: "More resilient operations", description: "Handle exceptions gracefully at scale" },
  { icon: Eye, title: "Better visibility into ROI", description: "Track measurable outcomes in real time" },
  { icon: Lock, title: "Stronger governance", description: "Centralized access and compliance control" },
];

const steps = [
  { icon: Search, step: "01", title: "Identify", description: "Discover high-value automation opportunities across your organization." },
  { icon: PenTool, step: "02", title: "Design", description: "Build workflows and agent experiences with low-code tools and AI assistance." },
  { icon: Rocket, step: "03", title: "Deploy", description: "Roll out automations across systems and teams with enterprise-grade reliability." },
  { icon: LineChart, step: "04", title: "Optimize", description: "Monitor, measure, and continuously scale for maximum operational impact." },
];

const useCases = [
  { icon: Headphones, title: "Customer Service & Support", description: "Automate ticket routing, resolution, and follow-ups with AI agents and human escalation." },
  { icon: Calculator, title: "Finance & Back Office", description: "Streamline invoicing, reconciliation, and compliance workflows across systems." },
  { icon: Monitor, title: "IT Operations", description: "Orchestrate monitoring, incident response, and infrastructure management." },
  { icon: FileText, title: "Document-Heavy Workflows", description: "Extract, validate, and process documents with intelligent automation." },
  { icon: UserCog, title: "Employee Operations", description: "Automate onboarding, HR requests, and internal service delivery." },
  { icon: GitBranch, title: "Cross-System Orchestration", description: "Connect and coordinate processes spanning multiple enterprise platforms." },
];

const integrations = [
  { icon: Building2, label: "Enterprise Apps", count: "500+" },
  { icon: Database, label: "Databases", count: "50+" },
  { icon: Globe, label: "APIs", count: "200+" },
  { icon: Brain, label: "AI Services / LLMs", count: "20+" },
  { icon: Wrench, label: "Third-Party Tools", count: "300+" },
];

const analyticsFeatures = [
  { icon: BarChart3, title: "ROI tracking", description: "Quantify the value of every automated workflow." },
  { icon: Activity, title: "Pipeline visibility", description: "See all running automations in real time." },
  { icon: Gauge, title: "Automation performance", description: "Track success rates, latency, and throughput." },
  { icon: Monitor, title: "Workload monitoring", description: "Balance agent capacity and system load." },
  { icon: Headphones, title: "Support management", description: "Manage support tickets and SLA compliance." },
  { icon: Lock, title: "Centralized access control", description: "Role-based governance across the platform." },
];

function ActionButton({ href, variant = "primary", children, onClick }) {
  return (
    <a href={href} className={`qubiButton ${variant === "outline" ? "qubiButtonOutline" : "qubiButtonPrimary"}`} onClick={onClick}>
      {children}
    </a>
  );
}

function SectionHeader({ eyebrow, title, highlight, description }) {
  return (
    <div className="sectionHeader">
      {eyebrow ? <span className="sectionEyebrow">{eyebrow}</span> : null}
      <h2 className="sectionTitle">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="gradientText">{highlight}</span>
          </>
        ) : null}
      </h2>
      {description ? <p className="sectionDescription">{description}</p> : null}
    </div>
  );
}

export default function QubiNext15Page({
  logoSrc = "/assets/images/qubi-logo.png",
  heroSrc = "/assets/images/hero-illustration.jpg",
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="qubiNext15">
     
      <main id="top">
        <section className="heroSection">
          <div className="heroGlow" />
          <div className="pageContainer heroGrid">
            <div className="heroCopy">
              <div className="fadeUp">
                <span className="heroPill">
                  <span className="heroPillDot" />
                  Agentic Automation Platform
                </span>
              </div>

              <h1 className="heroTitle fadeUp fadeUpDelay1">
                Orchestrate AI Agents, Bots, Systems &amp; People with{" "}
                <span className="gradientText">qubi</span>
              </h1>

              <p className="heroText fadeUp fadeUpDelay2">
                A unified platform for designing, deploying, and managing intelligent workflows
                powered by AI agents, automation, human input, and enterprise integrations.
              </p>

              <div className="heroActions fadeUp fadeUpDelay3">
                <ActionButton href="https://meetings.hubspot.com/automation-demo/scheduler">
                  Book a Demo
                  <ArrowRight size={18} />
                </ActionButton>
                {/* <ActionButton href="#capabilities" variant="outline">
                  <Play size={16} />
                  See the Platform
                </ActionButton> */}
              </div>
            </div>

            <div className="heroVisual fadeUp fadeUpDelay2">
              <div className="heroFrame">
                <img src={heroSrc} alt="qubi platform orchestration diagram" className="heroImage" />
                <div className="heroFrameRing" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="problem">
          <div className="pageContainer">
            <SectionHeader
              title="Enterprise work is too fragmented to automate with bots alone"
              description="Most enterprises struggle with siloed tools, manual processes, and limited scalability — making true end-to-end automation impossible."
            />

            <div className="problemGrid">
              {problems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="iconCard iconCardCentered">
                    <div className="iconTile">
                      <Icon size={24} />
                    </div>
                    <p className="iconCardLabel">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="capabilities">
          <div className="pageContainer">
            <SectionHeader
              eyebrow="What qubi is"
              title="One platform. Modular capabilities."
              highlight="Enterprise control."
            />

            <div className="capabilityGrid">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="featureCard">
                    <div className="featureIcon">
                      <Icon size={28} />
                    </div>
                    <h3 className="cardTitle">{item.title}</h3>
                    <p className="cardDescription">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="outcomes">
          <div className="pageContainer">
            <SectionHeader eyebrow="Platform outcomes" title="Built for measurable operational impact" />

            <div className="outcomeGrid">
              {outcomes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="outcomeItem">
                    <div className="outcomeIcon">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="outcomeTitle">{item.title}</h3>
                      <p className="outcomeDescription">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section sectionAlt" id="how-it-works">
          <div className="pageContainer">
            <SectionHeader eyebrow="How it works" title="From discovery to scale in four steps" />

            <div className="stepsGrid">
              {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="stepCard">
                    {index < steps.length - 1 ? <div className="stepConnector" aria-hidden="true" /> : null}
                    <div className="stepIconWrap">
                      <Icon size={32} />
                    </div>
                    <span className="stepNumber">{item.step}</span>
                    <h3 className="cardTitle stepTitle">{item.title}</h3>
                    <p className="cardDescription stepDescription">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="use-cases">
          <div className="pageContainer">
            <SectionHeader eyebrow="Use cases" title="Automation that fits your business" />

            <div className="capabilityGrid">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="featureCard useCaseCard">
                    <div className="featureIcon featureIconSmall">
                      <Icon size={24} />
                    </div>
                    <h3 className="cardTitle cardTitleSmall">{item.title}</h3>
                    <p className="cardDescription cardDescriptionSmall">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section sectionAlt" id="integrations">
          <div className="pageContainer">
            <SectionHeader
              eyebrow="Integrations"
              title="Works across your existing stack"
              description="Connect to the systems you already use — from enterprise ERPs to modern AI APIs — with pre-built connectors and extensible integration layers."
            />

            <div className="integrationGrid">
              {integrations.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="iconCard iconCardCentered iconCardSpacious">
                    <div className="iconTile iconTileLarge">
                      <Icon size={30} />
                    </div>
                    <div className="integrationCopy">
                      <p className="integrationCount">{item.count}</p>
                      <p className="integrationLabel">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="human-in-loop">
          <div className="pageContainer humanLoopGrid">
            <div className="orbitWrap">
              <div className="orbitShell">
                <div className="orbitRing orbitRingOuter" />
                <div className="orbitRing orbitRingInner" />
                <div className="orbitCenter">
                  <ArrowRight size={40} />
                </div>
                <div className="orbitNode orbitNodeTop">
                  <Bot size={28} />
                </div>
                <div className="orbitNode orbitNodeBottom">
                  <UserCheck size={28} />
                </div>
              </div>
            </div>

            <div>
              <span className="sectionEyebrow">Human-in-the-Loop</span>
              <h2 className="sectionTitle humanLoopTitle">
                Automation where it makes sense. <span className="gradientText">Human judgment where it matters.</span>
              </h2>
              <p className="humanLoopText">
                qubi seamlessly routes tasks between AI agents and human operators. When a workflow
                requires approval, exception handling, or expert judgment, the right person is brought
                into the loop — with full context and zero friction.
              </p>

              <div className="pillRow">
                {[
                  "Attended automation",
                  "Smart routing",
                  "Approval workflows",
                ].map((item) => (
                  <div key={item} className="miniPill">
                    <span className="miniPillDot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="humanLoopAction">
                <ActionButton href="https://meetings.hubspot.com/automation-demo/scheduler">
                  Learn More
                  <ArrowRight size={18} />
                </ActionButton>
              </div>
            </div>
          </div>
        </section>

        <section className="section sectionAlt" id="analytics">
          <div className="pageContainer">
            <SectionHeader
              eyebrow="Analytics & Trust"
              title="Visibility, performance, and accountability"
              highlight="built in"
            />

            <div className="analyticsGrid">
              {analyticsFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="analyticsCard">
                    <div className="analyticsCardHeader">
                      <div className="analyticsIcon">
                        <Icon size={20} />
                      </div>
                      <h3 className="analyticsTitle">{item.title}</h3>
                    </div>
                    <p className="analyticsDescription">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section ctaSection" id="final-cta">
          <div className="heroGlow ctaGlow" />
          <div className="pageContainer ctaInner">
            <h2 className="ctaTitle">
              See what <span className="gradientText">qubi</span> can automate in your enterprise
            </h2>
            <p className="ctaDescription">
              Ready to move from fragmented processes to intelligent, orchestrated workflows? Let&apos;s talk.
            </p>
            <div className="heroActions ctaActions">
              <ActionButton href="https://meetings.hubspot.com/automation-demo/scheduler">
                Book a Demo
                <ArrowRight size={18} />
              </ActionButton>
              <ActionButton href="https://meetings.hubspot.com/automation-demo/scheduler" variant="outline">
                <MessageSquare size={16} />
                Talk to an Expert
              </ActionButton>
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="footer">
        <div className="pageContainer footerInner">
          <div className="footerBrand">
            <img src={logoSrc} alt="qubi" className="footerLogo" />
          </div>

          <div className="footerLinks">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#top">Contact</a>
          </div>

          <p className="footerCopyright">© {new Date().getFullYear()} qubi by Qbotica. All rights reserved.</p>
        </div>
      </footer> */}



      <style jsx>{`
        .qubiNext15 {
          --background: 0 0% 100%;
          --foreground: 0 0% 7%;
          --card: 0 0% 100%;
          --card-foreground: 0 0% 7%;
          --primary: 24 100% 50%;
          --primary-foreground: 0 0% 100%;
          --secondary: 0 0% 96%;
          --secondary-foreground: 0 0% 7%;
          --muted: 0 0% 96%;
          --muted-foreground: 0 0% 45%;
          --accent: 24 100% 50%;
          --accent-foreground: 0 0% 100%;
          --border: 0 0% 90%;
          --surface-dark: 0 0% 4%;
          --surface-dark-foreground: 0 0% 95%;
          --surface-elevated: 0 0% 98%;
          --gradient-primary: linear-gradient(135deg, hsl(24 100% 50%), hsl(35 100% 55%));
          --gradient-glow: radial-gradient(ellipse at 50% 0%, hsl(24 100% 50% / 0.15), transparent 70%);
          --shadow-glow: 0 0 60px -15px hsl(24 100% 50% / 0.4);
          --shadow-card: 0 1px 3px hsl(0 0% 0% / 0.06), 0 4px 12px hsl(0 0% 0% / 0.04);
          --shadow-card-hover: 0 4px 20px hsl(0 0% 0% / 0.08), 0 8px 32px hsl(0 0% 0% / 0.04);
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-family: var(--font-inter);
          min-height: 100vh;
          width: 100%;
        }

        .qubiNext15,
        .qubiNext15 * {
          box-sizing: border-box;
        }

        .qubiNext15 img {
          display: block;
          max-width: 100%;
        }

        .qubiNext15 a {
          color: inherit;
          text-decoration: none;
        }

        .qubiNext15 button {
          font: inherit;
        }

        .qubiNext15 h1,
        .qubiNext15 h2,
        .qubiNext15 h3,
        .qubiNext15 p {
          margin: 0;
        }

        .pageContainer {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
        }

        .navBar {
          position: fixed;
          inset: 0 0 auto;
          z-index: 50;
          background: hsl(var(--background) / 0.9);
          border-bottom: 1px solid hsl(var(--border));
          backdrop-filter: blur(20px);
        }

        .navInner {
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brandLink,
        .footerBrand {
          display: inline-flex;
          align-items: center;
        }

        .brandLogo {
          height: 32px;
          width: auto;
        }

        .footerLogo {
          height: 24px;
          width: auto;
        }

        .desktopNavLinks,
        .desktopCta {
          display: none;
        }

        .navLink {
          font-size: 14px;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          transition: color 180ms ease;
        }

        .navLink:hover,
        .mobileNavLink:hover,
        .footerLinks a:hover {
          color: hsl(var(--primary));
        }

        .mobileToggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: hsl(var(--foreground));
          cursor: pointer;
        }

        .mobilePanel {
          border-top: 1px solid hsl(var(--border));
          background: hsl(var(--background));
        }

        .mobilePanelInner {
          padding: 0 0 16px;
          display: grid;
          gap: 2px;
        }

        .mobileNavLink {
          padding: 12px 0;
          font-size: 14px;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          transition: color 180ms ease;
        }

        .heroSection {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 0;
          background: hsl(var(--background));
        }

        .heroGlow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: var(--gradient-glow);
        }

        .heroGrid,
        .humanLoopGrid,
        .footerInner {
          display: grid;
          gap: 48px;
        }

        .heroGrid {
          align-items: center;
          padding: 40px 0;
        }

        .heroCopy {
          max-width: 672px;
          position: relative;
          z-index: 1;
        }

        .heroPill,
        .miniPill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .heroPill {
          margin-bottom: 24px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid hsl(var(--primary) / 0.2);
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          font-size: 14px;
          font-weight: 500;
        }

        .heroPillDot,
        .miniPillDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: hsl(var(--primary));
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .heroTitle {
          font-size: 36px;
          line-height: 1.1;
          letter-spacing: -0.025em;
          font-weight: 700;
        }

        .heroText,
        .sectionDescription,
        .humanLoopText,
        .ctaDescription {
          color: hsl(var(--muted-foreground));
          line-height: 1.7;
        }

        .heroText {
          margin-top: 24px;
          max-width: 576px;
          font-size: 18px;
        }

        .heroActions,
        .pillRow,
        .footerLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .heroActions {
          margin-top: 40px;
        }

        .qubiButton {
          min-height: 48px;
          padding: 14px 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 12px;
          border: 2px solid transparent;
          font-size: 16px;
          font-weight: 600;
          font-family: var(--font-inter);
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .qubiButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 102, 0, 0.25);
        }

        .qubiButton:active {
          transform: translateY(0);
        }

        .qubiButtonPrimary {
          background: #ff6600;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
        }

        .qubiButtonPrimary:hover {
          background: #ff7f1a;
          box-shadow: 0 8px 24px rgba(255, 102, 0, 0.4);
        }

        .qubiButtonOutline {
          background: #ffffff;
          border-color: #ff6600;
          color: #ff6600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .qubiButtonOutline:hover {
          background: #fff5f0;
          border-color: #ff7f1a;
          color: #ff7f1a;
        }

        .heroVisual {
          position: relative;
          z-index: 1;
        }

        .heroFrame {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: var(--shadow-card-hover);
        }

        .heroImage {
          width: 100%;
          height: auto;
          border-radius: 16px;
        }

        .heroFrameRing {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          box-shadow: inset 0 0 0 1px hsl(var(--primary) / 0.2);
        }

        .section {
          position: relative;
          padding: 64px 0;
          background: hsl(var(--background));
        }

        .sectionAlt {
          background: hsl(var(--surface-elevated));
        }

        .sectionHeader,
        .ctaInner {
          text-align: center !important;
          max-width: 768px;
          margin: 0 auto 48px !important;
        }

        .sectionHeader .sectionEyebrow {
          display: block !important;
          color: #ff6600 !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          font-family: var(--font-inter) !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase !important;
          margin-bottom: 16px !important;
          text-align: center !important;
          padding: 0 !important;
        }

        .sectionHeader .sectionTitle,
        .ctaInner .ctaTitle {
          margin-top: 0 !important;
          font-size: 30px !important;
          line-height: 1.15 !important;
          letter-spacing: -0.025em !important;
          font-weight: 700 !important;
          font-family: var(--font-inter) !important;
          color: hsl(var(--foreground)) !important;
          text-align: center !important;
          padding: 0 !important;
        }

        .sectionHeader .sectionDescription {
          margin-top: 24px !important;
          max-width: 640px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          font-size: 18px !important;
          font-family: var(--font-inter) !important;
          text-align: center !important;
          padding: 0 !important;
        }

        .gradientText {
          background-image: var(--gradient-primary);
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }

        .problemGrid,
        .capabilityGrid,
        .outcomeGrid,
        .stepsGrid,
        .integrationGrid,
        .analyticsGrid {
          display: grid;
          gap: 24px;
        }

        .problemGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .capabilityGrid,
        .outcomeGrid,
        .analyticsGrid {
          grid-template-columns: 1fr;
        }

        .stepsGrid {
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .integrationGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .iconCard,
        .featureCard,
        .analyticsCard {
          border: 1px solid hsl(var(--border));
          border-radius: 16px;
          background: hsl(var(--card));
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease, background 200ms ease, color 200ms ease;
        }

        .iconCard:hover,
        .featureCard:hover,
        .analyticsCard:hover {
          transform: translateY(-4px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow: var(--shadow-card-hover);
        }

        .iconCardCentered {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          background: hsl(var(--surface-elevated));
        }

        .iconCardSpacious {
          padding: 32px 24px;
          background: hsl(var(--background));
        }

        .iconTile,
        .featureIcon,
        .outcomeIcon,
        .analyticsIcon,
        .orbitCenter,
        .orbitNode {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
          transition: background 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .iconCard:hover .iconTile,
        .featureCard:hover .featureIcon,
        .analyticsCard:hover .analyticsIcon {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        .iconTile {
          width: 48px;
          height: 48px;
          border-radius: 12px;
        }

        .iconTileLarge {
          width: 64px;
          height: 64px;
          border-radius: 16px;
        }

        .iconCardLabel,
        .integrationLabel,
        .footerCopyright {
          font-size: 14px;
          color: hsl(var(--muted-foreground));
        }

        .featureCard,
        .useCaseCard {
          padding: 32px;
        }

        .featureIcon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          margin-bottom: 24px;
        }

        .featureIconSmall {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .cardTitle,
        .outcomeTitle,
        .analyticsTitle {
          color: hsl(var(--foreground));
          font-weight: 600;
          font-family: var(--font-inter);
        }

        .cardTitle {
          font-size: 20px;
          font-family: var(--font-inter);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .cardTitleSmall {
          font-size: 18px;
          font-weight: 700;
          font-family: var(--font-inter);
          margin-bottom: 8px;
        }

        .cardDescription,
        .outcomeDescription,
        .analyticsDescription {
          color: hsl(var(--muted-foreground));
          line-height: 1.8;
          font-family: var(--font-inter);
          font-weight: 500;
        }

        .cardDescriptionSmall,
        .outcomeDescription,
        .analyticsDescription {
          font-size: 14px;
        }

        .outcomeItem {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px;
          border-radius: 16px;
          transition: background 180ms ease, transform 180ms ease;
        }

        .outcomeItem:hover {
          transform: translateY(-2px);
          background: hsl(var(--surface-elevated));
        }

        .outcomeItem:hover .outcomeIcon {
          transform: scale(1.08);
        }

        .outcomeIcon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 12px;
        }

        .outcomeTitle {
          font-size: 18px;
          margin-bottom: 4px;
          font-weight: 700;
          font-family: var(--font-inter);
        }

        .stepCard {
          position: relative;
          text-align: center;
        }

        .stepConnector {
          display: none;
        }

        .stepIconWrap {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
          border: 1px solid hsl(var(--primary) / 0.2);
          transition: background 180ms ease, color 180ms ease;
        }

        .stepCard:hover .stepIconWrap {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        .stepNumber {
          display: block;
          margin-bottom: 8px;
          color: hsl(var(--primary));
          font-size: 14px;
          font-weight: 700;
        }

        .stepTitle {
          margin-bottom: 12px;
        }

        .stepDescription {
          max-width: 280px;
          margin: 0 auto;
          font-size: 14px;
        }

        .integrationCopy {
          text-align: center;
        }

        .integrationCount {
          color: hsl(var(--primary));
          font-size: 32px;
          font-weight: 700;
        }

        .integrationLabel {
          margin-top: 4px;
        }

        .humanLoopGrid {
          align-items: center;
        }

        .orbitWrap {
          position: relative;
        }

        .orbitShell {
          position: relative;
          width: min(100%, 420px);
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }

        .orbitRing {
          position: absolute;
          inset: 0;
          border-radius: 999px;
        }

        .orbitRingOuter {
          border: 2px dashed hsl(var(--primary) / 0.2);
          animation: spin 30s linear infinite;
        }

        .orbitRingInner {
          inset: 32px;
          border: 1px solid hsl(var(--primary) / 0.1);
        }

        .orbitCenter {
          position: absolute;
          inset: 50% auto auto 50%;
          width: 96px;
          height: 96px;
          border-radius: 16px;
          transform: translate(-50%, -50%);
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          box-shadow: var(--shadow-glow);
        }

        .orbitNode {
          position: absolute;
          left: 50%;
          width: 64px;
          height: 64px;
          margin-left: -32px;
          border-radius: 12px;
          background: hsl(var(--surface-elevated));
          color: hsl(var(--primary));
          border: 1px solid hsl(var(--border));
          box-shadow: var(--shadow-card);
        }

        .orbitNodeTop {
          top: 16px;
        }

        .orbitNodeBottom {
          bottom: 16px;
        }

        .humanLoopTitle {
          text-align: left;
          margin-top: 16px;
        }

        .humanLoopText {
          margin-top: 24px;
          font-size: 18px;
        }

        .pillRow {
          margin-top: 32px;
        }

        .miniPill {
          padding: 10px 16px;
          border-radius: 10px;
          background: hsl(var(--surface-elevated));
          font-size: 14px;
          font-weight: 500;
          color: hsl(var(--foreground));
        }

        .humanLoopAction {
          margin-top: 32px;
        }

        .analyticsCard {
          padding: 24px;
          background: hsl(var(--background));
        }

        .analyticsCardHeader {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .analyticsIcon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .analyticsTitle {
          font-size: 16px;
        }

        .analyticsDescription {
          padding-left: 56px;
        }

        .ctaSection {
          overflow: hidden;
        }

        .ctaGlow {
          opacity: 0.5;
        }

        .ctaInner {
          position: relative;
          z-index: 1;
        }

        .ctaActions {
          justify-content: center;
        }

        .footer {
          border-top: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          padding: 48px 0;
        }

        .footerInner {
          align-items: center;
          justify-content: space-between;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .footerLinks {
          color: hsl(var(--muted-foreground));
          font-size: 14px;
        }

        .footerCopyright {
          color: hsl(var(--muted-foreground));
        }

        .fadeUp {
          opacity: 0;
          animation: fadeUp 0.6s ease-out forwards;
        }

        .fadeUpDelay1 {
          animation-delay: 0.1s;
        }

        .fadeUpDelay2 {
          animation-delay: 0.2s;
        }

        .fadeUpDelay3 {
          animation-delay: 0.3s;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @media (min-width: 640px) {
          .heroTitle {
            font-size: 48px;
          }

          .heroText {
            font-size: 20px;
          }

          .sectionHeader .sectionTitle,
          .ctaInner .ctaTitle {
            font-size: 36px !important;
          }

          .problemGrid,
          .integrationGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .capabilityGrid,
          .outcomeGrid,
          .analyticsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .stepsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 768px) {
          .desktopNavLinks {
            display: flex;
            align-items: center;
            gap: 32px;
          }

          .desktopCta {
            display: block;
          }

          .mobileToggle,
          .mobilePanel {
            display: none;
          }

          .footerInner {
            flex-direction: row;
            text-align: left;
          }

          .footerBrand {
            justify-content: flex-start;
          }

          .footerLinks {
            justify-content: center;
          }
        }

        @media (min-width: 1024px) {
          .pageContainer {
            padding-left: 32px;
            padding-right: 32px;
          }

          .heroGrid,
          .humanLoopGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 64px;
          }

          .heroGrid {
            padding: 60px 0;
          }

          .heroTitle {
            font-size: 60px;
          }

          .sectionHeader .sectionTitle,
          .ctaInner .ctaTitle {
            font-size: 48px !important;
          }

          .section {
            padding: 80px 0;
          }

          .problemGrid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }

          .capabilityGrid,
          .outcomeGrid,
          .analyticsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .stepsGrid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .stepConnector {
            display: block;
            position: absolute;
            top: 40px;
            left: 100%;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent);
          }

          .integrationGrid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }

        @media (max-width: 1023px) {
          .humanLoopTitle,
          .humanLoopText {
            text-align: center;
          }

          .pillRow,
          .humanLoopAction {
            justify-content: center;
            display: flex;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 767px) {
          .footerInner {
            text-align: center;
          }

          .footerBrand {
            justify-content: center;
          }
        }

        @media (max-width: 639px) {
          .analyticsDescription {
            padding-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fadeUp,
          .heroPillDot,
          .miniPillDot,
          .orbitRingOuter {
            animation: none;
          }

          .qubiButton,
          .iconCard,
          .featureCard,
          .analyticsCard,
          .outcomeItem,
          .outcomeIcon {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}