import { SectionHeader } from "./SharedComponents";
import {
  PenTool,
  Layers,
  Plug,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export function CapabilitiesSection({ data }) {
  const eyebrow = data?.eyebrow || "What qubi is";
  const title = data?.title || "One platform. Modular capabilities.";
  const highlight = data?.highlight || "Enterprise control.";
  const capabilities = Array.isArray(data?.capabilities) ? data.capabilities : [];

  const iconMap = {
    design: PenTool,
    orchestrate: Layers,
    integrate: Plug,
    collaborate: Users,
    optimize: BarChart3,
    support: ShieldCheck,
  };

  return (
    <section className="section" id="capabilities">
      <div className="pageContainer">
        <SectionHeader eyebrow={eyebrow} title={title} highlight={highlight} />

        <div className="capabilityGrid">
          {capabilities.map((item, index) => {
            const iconKey =
              typeof item.icon === "string"
                ? item.icon
                : item.icon?.value || "";

            const Icon = iconMap[iconKey] || PenTool;

            return (
              <div key={index} className="featureCard">
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
  );
}
