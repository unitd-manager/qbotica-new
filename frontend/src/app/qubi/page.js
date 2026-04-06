import { useState } from "react";
import { Button } from "@/components/ui/button";
import qubiLogo from "@/assets/qubi-logo.png";
import heroIllustration from "@/assets/hero-illustration.jpg";
import {
  Menu, X, ArrowRight, Play, MessageSquare,
  AlertTriangle, Unlink, Eye, Scaling, HandMetal,
  Paintbrush, Layers, Plug, Users, BarChart3, ShieldCheck,
  Search, PenTool, Rocket, LineChart,
  Headphones, Calculator, Monitor, FileText, UserCog, GitBranch,
  UserCheck, Bot,
  Building2, Database, Globe, Brain, Wrench,
  Activity, Gauge, Lock,
  Zap, DollarSign, TrendingUp, Shield,
} from "lucide-react";

/* ───────────── Navbar ───────────── */
const navLinks = [
  { label: "Platform", href: "#capabilities" },
  { label: "Capabilities", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Resources", href: "#analytics" },
  { label: "Contact", href: "#final-cta" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <img src={qubiLogo} alt="qubi" className="h-8" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <Button variant="hero" size="lg">Book a Demo</Button>
        </div>
        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="lg" className="w-full mt-2">Book a Demo</Button>
        </div>
      )}
    </nav>
  );
};

/* ───────────── Hero ───────────── */
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
    <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
    <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="max-w-2xl">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Agentic Automation Platform
            </span>
          </div>
          <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
            Orchestrate AI Agents, Bots, Systems & People with{" "}
            <span className="text-gradient">qubi</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
            A unified platform for designing, deploying, and managing intelligent workflows powered by AI agents, automation, human input, and enterprise integrations.
          </p>
          <div className="animate-fade-up-delay-3 flex flex-wrap gap-4 mt-10">
            <Button variant="hero" size="lg" className="gap-2 px-8 h-12">Book a Demo <ArrowRight size={18} /></Button>
            <Button variant="hero-outline" size="lg" className="gap-2 px-8 h-12"><Play size={16} /> See the Platform</Button>
          </div>
        </div>
        <div className="animate-fade-up-delay-2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
            <img src={heroIllustration} alt="qubi platform orchestration diagram" className="w-full h-auto rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── Problem ───────────── */
const problems = [
  { icon: Unlink, label: "Disconnected systems" },
  { icon: HandMetal, label: "Manual handoffs" },
  { icon: AlertTriangle, label: "Exception-heavy workflows" },
  { icon: Eye, label: "Limited visibility" },
  { icon: Scaling, label: "Difficulty scaling automation" },
];

const ProblemSection = () => (
  <section className="py-24 lg:py-32 bg-background" id="problem">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Enterprise work is too fragmented to automate with bots alone
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Most enterprises struggle with siloed tools, manual processes, and limited scalability — making true end-to-end automation impossible.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {problems.map((item) => (
          <div key={item.label} className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <item.icon size={24} />
            </div>
            <p className="text-sm font-medium text-center text-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Capabilities ───────────── */
const capabilities = [
  { icon: Paintbrush, title: "Design", description: "Build automations and AI-powered workflows with low-code tools." },
  { icon: Layers, title: "Orchestrate", description: "Coordinate bots, agents, systems, and workloads from one control layer." },
  { icon: Plug, title: "Integrate", description: "Connect enterprise systems, apps, data, and AI services seamlessly." },
  { icon: Users, title: "Collaborate", description: "Bring humans into the loop when judgment or approvals are required." },
  { icon: BarChart3, title: "Optimize", description: "Measure performance, ROI, and operational impact in real time." },
  { icon: ShieldCheck, title: "Support & Govern", description: "Manage access, support issues, and enterprise reliability at scale." },
];

const CapabilitiesSection = () => (
  <section className="py-24 lg:py-32 bg-background" id="capabilities">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">What qubi is</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          One platform. Modular capabilities.{" "}
          <span className="text-gradient">Enterprise control.</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap) => (
          <div key={cap.title} className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <cap.icon size={28} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{cap.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Outcomes ───────────── */
const outcomes = [
  { icon: Zap, title: "Faster cycle times", description: "Accelerate end-to-end process completion" },
  { icon: DollarSign, title: "Lower operating cost", description: "Reduce manual effort and rework" },
  { icon: TrendingUp, title: "Better productivity", description: "Free teams for higher-value work" },
  { icon: Shield, title: "More resilient operations", description: "Handle exceptions gracefully at scale" },
  { icon: Eye, title: "Better visibility into ROI", description: "Track measurable outcomes in real time" },
  { icon: Lock, title: "Stronger governance", description: "Centralized access and compliance control" },
];

const OutcomesSection = () => (
  <section className="py-24 lg:py-32 bg-background" id="outcomes">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Platform outcomes</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Built for measurable operational impact
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {outcomes.map((item) => (
          <div key={item.title} className="group flex items-start gap-5 p-6 rounded-2xl hover:bg-surface-elevated transition-all duration-300">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <item.icon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── How It Works ───────────── */
const steps = [
  { icon: Search, step: "01", title: "Identify", description: "Discover high-value automation opportunities across your organization." },
  { icon: PenTool, step: "02", title: "Design", description: "Build workflows and agent experiences with low-code tools and AI assistance." },
  { icon: Rocket, step: "03", title: "Deploy", description: "Roll out automations across systems and teams with enterprise-grade reliability." },
  { icon: LineChart, step: "04", title: "Optimize", description: "Monitor, measure, and continuously scale for maximum operational impact." },
];

const HowItWorksSection = () => (
  <section className="py-24 lg:py-32 bg-surface-elevated" id="how-it-works">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">How it works</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          From discovery to scale in four steps
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item, i) => (
          <div key={item.step} className="relative group">
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-10 left-[calc(100%)] w-full h-px bg-gradient-to-r from-primary/40 to-transparent z-0" />
            )}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon size={32} />
              </div>
              <span className="text-primary font-bold text-sm mb-2">{item.step}</span>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Use Cases ───────────── */
const useCases = [
  { icon: Headphones, title: "Customer Service & Support", description: "Automate ticket routing, resolution, and follow-ups with AI agents and human escalation." },
  { icon: Calculator, title: "Finance & Back Office", description: "Streamline invoicing, reconciliation, and compliance workflows across systems." },
  { icon: Monitor, title: "IT Operations", description: "Orchestrate monitoring, incident response, and infrastructure management." },
  { icon: FileText, title: "Document-Heavy Workflows", description: "Extract, validate, and process documents with intelligent automation." },
  { icon: UserCog, title: "Employee Operations", description: "Automate onboarding, HR requests, and internal service delivery." },
  { icon: GitBranch, title: "Cross-System Orchestration", description: "Connect and coordinate processes spanning multiple enterprise platforms." },
];

const UseCasesSection = () => (
  <section className="py-24 lg:py-32 bg-background" id="use-cases">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Use cases</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Automation that fits your business
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((item) => (
          <div key={item.title} className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Integration ───────────── */
const integrations = [
  { icon: Building2, label: "Enterprise Apps", count: "500+" },
  { icon: Database, label: "Databases", count: "50+" },
  { icon: Globe, label: "APIs", count: "200+" },
  { icon: Brain, label: "AI Services / LLMs", count: "20+" },
  { icon: Wrench, label: "Third-Party Tools", count: "300+" },
];

const IntegrationSection = () => (
  <section className="py-24 lg:py-32 bg-surface-elevated" id="integrations">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Integrations</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Works across your existing stack
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect to the systems you already use — from enterprise ERPs to modern AI APIs — with pre-built connectors and extensible integration layers.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {integrations.map((item) => (
          <div key={item.label} className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-border hover:border-primary/40 bg-background transition-all duration-300 hover:shadow-card-hover">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <item.icon size={30} />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{item.count}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Human in the Loop ───────────── */
const HumanInLoopSection = () => (
  <section className="py-24 lg:py-32 bg-background" id="human-in-loop">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square max-w-md mx-auto relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-dashed border-primary/20 animate-[spin_30s_linear_infinite]" />
            </div>
            <div className="absolute inset-8 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-primary/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                <ArrowRight size={40} className="text-primary-foreground" />
              </div>
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-surface-elevated border border-border flex items-center justify-center shadow-card">
              <Bot size={28} className="text-primary" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-surface-elevated border border-border flex items-center justify-center shadow-card">
              <UserCheck size={28} className="text-primary" />
            </div>
          </div>
        </div>
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Human-in-the-Loop</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Automation where it makes sense.{" "}
            <span className="text-gradient">Human judgment where it matters.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            qubi seamlessly routes tasks between AI agents and human operators. When a workflow requires approval, exception handling, or expert judgment, the right person is brought into the loop — with full context and zero friction.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {["Attended automation", "Smart routing", "Approval workflows"].map((t) => (
              <div key={t} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-surface-elevated">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground">{t}</span>
              </div>
            ))}
          </div>
          <Button variant="hero" size="lg" className="mt-8 gap-2">Learn More <ArrowRight size={18} /></Button>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── Analytics ───────────── */
const analyticsFeatures = [
  { icon: BarChart3, title: "ROI tracking", description: "Quantify the value of every automated workflow." },
  { icon: Activity, title: "Pipeline visibility", description: "See all running automations in real time." },
  { icon: Gauge, title: "Automation performance", description: "Track success rates, latency, and throughput." },
  { icon: Monitor, title: "Workload monitoring", description: "Balance agent capacity and system load." },
  { icon: Headphones, title: "Support management", description: "Manage support tickets and SLA compliance." },
  { icon: Lock, title: "Centralized access control", description: "Role-based governance across the platform." },
];

const AnalyticsSection = () => (
  <section className="py-24 lg:py-32 bg-surface-elevated" id="analytics">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Analytics & Trust</span>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Visibility, performance, and accountability{" "}
          <span className="text-gradient">built in</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsFeatures.map((item) => (
          <div key={item.title} className="group p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed pl-14">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Final CTA ───────────── */
const FinalCTASection = () => (
  <section className="py-24 lg:py-32 bg-background relative overflow-hidden" id="final-cta">
    <div className="absolute inset-0 bg-gradient-glow pointer-events-none opacity-50" />
    <div className="relative container mx-auto px-4 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto">
        See what <span className="text-gradient">qubi</span> can automate in your enterprise
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
        Ready to move from fragmented processes to intelligent, orchestrated workflows? Let's talk.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Button variant="hero" size="lg" className="gap-2 px-8 h-12">Book a Demo <ArrowRight size={18} /></Button>
        <Button variant="hero-outline" size="lg" className="gap-2 px-8 h-12"><MessageSquare size={16} /> Talk to an Expert</Button>
      </div>
    </div>
  </section>
);

/* ───────────── Footer ───────────── */
const FooterSection = () => (
  <footer className="py-12 bg-background border-t border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={qubiLogo} alt="qubi" className="h-6" />
        </div>
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} qubi by Qbotica. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

/* ───────────── Page ───────────── */
const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <CapabilitiesSection />
    <OutcomesSection />
    <HowItWorksSection />
    <UseCasesSection />
    <IntegrationSection />
    <HumanInLoopSection />
    <AnalyticsSection />
    <FinalCTASection />
    <FooterSection />
  </div>
);

export default Index;
