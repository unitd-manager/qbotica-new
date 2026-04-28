import { SectionHeader } from "./SharedComponents";
import { Headphones, Calculator, Monitor, FileText, UserCog, GitBranch } from "lucide-react";

// Map WordPress string values to Lucide icons
const iconMap = {
  headphones: Headphones,
  calculator: Calculator,
  monitor: Monitor,
  file_text: FileText,
  user_cog: UserCog,
  git_branch: GitBranch,
};

export function UseCasesSection({ data }) {
  const eyebrow = data?.eyebrow || "Use cases";
  const title = data?.title || "Automation that fits your business";
  const useCases = data?.usecases || []; // <-- match ACF field name exactly

  console.log("✓ Rendering UseCasesSection with data:", data);

  return (
    <section className="section" id="use-cases">
      <div className="pageContainer">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="capabilityGrid">
          {Array.isArray(useCases) && useCases.length > 0 ? (
            useCases.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={index} className="featureCard useCaseCard">
                  <div className="featureIcon featureIconSmall">
                    {Icon && <Icon size={24} />}
                  </div>
                  <h3 className="cardTitle cardTitleSmall">{item.title}</h3>
                  <p className="cardDescription cardDescriptionSmall">{item.description}</p>
                </div>
              );
            })
          ) : (
            <p>No use cases found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
