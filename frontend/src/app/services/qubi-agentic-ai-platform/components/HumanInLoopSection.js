import { ArrowRight, Bot, UserCheck } from "lucide-react";
import { ActionButton } from "./SharedComponents";

export function HumanInLoopSection({ data }) {
  const eyebrow = data?.eyebrow || "Human-in-the-Loop";
  const title =
    data?.title ||
    "Automation where it makes sense. Human judgment where it matters.";
  const description =
    data?.description ||
    "qubi seamlessly routes tasks between AI agents and human operators. When a workflow requires approval, exception handling, or expert judgment, the right person is brought into the loop — with full context and zero friction.";

  const pills =
    data?.pills?.length > 0
      ? data.pills
      : [
          { pill_item: "Attended automation" },
          { pill_item: "Smart routing" },
          { pill_item: "Approval workflows" },
        ];

  const buttonField = data?.button_url || null;
  const buttonText = data?.button_text || buttonField?.title || "Learn More";
  const buttonUrl =
    buttonField?.url ||
    "https://meetings.hubspot.com/automation-demo/scheduler";
  const buttonTarget = buttonField?.target || "_self";

  return (
    <section className="section" id="human-in-loop">
      <div className="pageContainer humanLoopGrid">
        {/* Left orbit graphic */}
        <div className="orbitWrap">
          <div className="orbitShell">
            <div className="orbitRing orbitRingOuter dotted rotating" />
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

        {/* Right content */}
        <div>
          <span className="sectionEyebrow">{eyebrow}</span>
          <h2 className="sectionTitle humanLoopTitle">
            Automation where it makes sense.{" "}
            <span className="highlightOrange">Human judgment where it matters.</span>
          </h2>
          <p className="humanLoopText">{description}</p>

          <div className="pillRow">
            {Array.isArray(pills) &&
              pills.map((item, index) => (
                <div key={index} className="miniPill">
                  <span className="miniPillDot" />
                  <span>{item?.pill_item || item}</span>
                </div>
              ))}
          </div>

          <div className="humanLoopAction">
            <ActionButton href={buttonUrl} target={buttonTarget}>
              {buttonText}
              <ArrowRight size={18} />
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
