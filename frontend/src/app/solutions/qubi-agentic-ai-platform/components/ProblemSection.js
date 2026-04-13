import { SectionHeader } from "./SharedComponents";
import { AlertTriangle, Layers, Workflow, Users, Database } from "lucide-react";

export function ProblemSection({ data }) {
  const title = data?.title || "";
  const description = data?.description || "";

  // Render only dynamic data
  const problems = Array.isArray(data?.problems) ? data.problems : [];

  const iconMap = {
    siloed: Layers,
    manual: Workflow,
    scalability: AlertTriangle,
    people: Users,
    data: Database,
  };

  return (
    <section className="section" id="problem">
      <div className="pageContainer">
        <SectionHeader title={title} description={description} />

        <div className="problemGrid">
          {problems.map((item, index) => {
            const Icon = iconMap[item.icon] || AlertTriangle;
            return (
              <div key={index} className="iconCard iconCardCentered">
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
  );
}
