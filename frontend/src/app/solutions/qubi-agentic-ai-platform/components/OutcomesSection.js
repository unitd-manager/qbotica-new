import { SectionHeader } from "./SharedComponents";
import { Clock, DollarSign, Users, Shield, BarChart, Lock } from "lucide-react";

const iconMap = {
  cycle_times: Clock,
  operating_cost: DollarSign,
  productivity: Users,
  resilient: Shield,
  roi: BarChart,
  governance: Lock,
};

export function OutcomesSection({ data }) {
  const eyebrow = data?.eyebrow || "Platform outcomes";
  const title = data?.title || "Built for measurable operational impact";
  const outcomes = data?.outcomes || [];

  return (
    <section className="section" id="outcomes">
      <div className="pageContainer">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="outcomeGrid">
          {outcomes.map((item, index) => {
            const Icon = iconMap[item.icon]; // WordPress sends "cycle_times", "operating_cost", etc.
            return (
              <div key={index} className="outcomeItem">
                <div className="outcomeIcon">
                  {Icon && <Icon size={24} />}
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
  );
}
