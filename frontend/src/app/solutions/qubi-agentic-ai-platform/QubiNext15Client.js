"use client";

import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { OutcomesSection } from "./components/OutcomesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { UseCasesSection } from "./components/UseCasesSection";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { HumanInLoopSection } from "./components/HumanInLoopSection";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { CTASection } from "./components/CTASection";

function renderSection(section, index) {
  const layoutType = section?.acf_fc_layout;

  if (!layoutType) {
    console.warn("⚠️ Section missing acf_fc_layout:", section);
    return null;
  }

  switch (layoutType) {
    case "qubi_banner_section":
      return <HeroSection key={`${layoutType}-${index}`} data={section} />;

    case "problem_section":
      return <ProblemSection key={`${layoutType}-${index}`} data={section} />;

    case "capabilities_section":
      return <CapabilitiesSection key={`${layoutType}-${index}`} data={section} />;

   case 'outcomes_section':
  console.log('    ✓ Rendering OutcomesSection with data:', section);
  return <OutcomesSection key={`${layoutType}-${index}`} data={section} />;

    case "how_it_works_section":
      return <HowItWorksSection key={`${layoutType}-${index}`} data={section} />;

    case "use_cases_section":
  console.log("    ✓ Rendering UseCasesSection with data:", section);
  return <UseCasesSection key={`${layoutType}-${index}`} data={section} />;


  case "integrations_sections":
      return <IntegrationsSection key={`${layoutType}-${index}`} data={section} />;

    case "human_in_loop_section":
      return <HumanInLoopSection key={`${layoutType}-${index}`} data={section} />;

    case "analytics_section":
      return <AnalyticsSection key={`${layoutType}-${index}`} data={section} />;

    case "cta_section":
      return <CTASection key={`${layoutType}-${index}`} data={section} />;

    default:
      console.warn(`⚠️ Unknown layout type: ${layoutType}`);
      return null;
  }
}

export default function QubiNext15Client({ pageSections }) {
  return (
    <div className="qubiNext15">
      <main id="top">
        {pageSections?.length > 0 ? (
          pageSections.map((section, index) => renderSection(section, index))
        ) : (
          <p>Loading…</p>
        )}
      </main>
    </div>
  );
}
