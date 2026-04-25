import { SectionHeader } from "./SharedComponents";
import { Search, PenTool, Rocket, LineChart } from "lucide-react";

// Map WordPress string values to Lucide icons
const iconMap = {
  search: Search,
  pen_tool: PenTool,
  rocket: Rocket,
  line_chart: LineChart,
};

export function HowItWorksSection({ data }) {
  const eyebrow = data?.eyebrow || "How it works";
  const title = data?.title || "From discovery to scale in four steps";
  const steps = data?.steps || [];

  return (
    <section className="section sectionAlt" id="how-it-works">
      <div className="pageContainer">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="stepsGrid">
          {steps.map((item, index) => {
            const Icon = iconMap[item.icon]; // WordPress sends "search", "pen_tool", etc.
            return (
              <div key={item.step} className="stepCard">
                {index < steps.length - 1 ? (
                  <div className="stepConnector" aria-hidden="true" />
                ) : null}
                <div className="stepIconWrap">
                  {Icon && <Icon size={32} />}
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
  );
}
