import { SectionHeader } from "./SharedComponents";
import {
  BarChart3,
  Eye,
  Activity,
  Monitor,
  LifeBuoy,
  Key,
} from "lucide-react"; // Lucide icons

export function AnalyticsSection({ data }) {
  const eyebrow = data?.eyebrow || "Analytics & Trust";
  const title = data?.title || "Visibility, performance, and accountability";
  const highlight = data?.highlight || "built in";

  // Features from ACF repeater
  const features = data?.features || [];

  // Map icon strings to Lucide components
  const iconMap = {
    roi: BarChart3,
    pipeline: Eye,
    performance: Activity,
    workload: Monitor,
    support: LifeBuoy,
    access: Key,
  };

  return (
    <section className="section sectionAlt" id="analytics">
      <div className="pageContainer">
        <SectionHeader eyebrow={eyebrow} title={title} highlight={highlight} />

        <div className="analyticsGrid">
          {features.map((item, index) => {
            const Icon = iconMap[item.icon] || BarChart3; // fallback
            return (
              <div key={index} className="analyticsCard">
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
  );
}
