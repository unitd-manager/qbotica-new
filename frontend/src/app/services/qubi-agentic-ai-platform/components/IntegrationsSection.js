import { SectionHeader } from "./SharedComponents";
import { Building, Database, Network, Brain, Wrench } from "lucide-react";

const iconMap = {
  building: Building,
  database: Database,
  network: Network,
  brain: Brain,
  wrench: Wrench,
};

export function IntegrationsSection({ data }) {
  const eyebrow = data?.eyebrow || "Integrations";
  const title = data?.title || "Works across your existing stack";
  const description =
    data?.description ||
    "Connect to the systems you already use — from enterprise ERPs to modern AI APIs — with pre-built connectors and extensible integration layers.";
  const integrations = data?.integrations || []; // must match ACF field name

  console.log("✓ Rendering IntegrationsSection with data:", data);

  return (
    <section className="section sectionAlt" id="integrations">
      <div className="pageContainer">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="integrationGrid">
          {Array.isArray(integrations) && integrations.length > 0 ? (
            integrations.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={index}
                  className="iconCard iconCardCentered iconCardSpacious"
                >
                  <div className="iconTile iconTileLarge">
                    {Icon && <Icon size={30} />}
                  </div>
                  <div className="integrationCopy">
                    <p className="integrationCount">{item.count}</p>
                    <p className="integrationLabel">{item.label}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No integrations found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
