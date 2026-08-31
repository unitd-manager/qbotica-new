import { ArrowRight, MessageSquare } from "lucide-react";
import { ActionButton } from "./SharedComponents";

export function CTASection({ data }) {
  const title =
    data?.title || "See what qubi can automate in your enterprise";
  const description =
    data?.description ||
    "Ready to move from fragmented processes to intelligent, orchestrated workflows? Let's talk.";

  // Button 1 (Book a Demo)
  const button1Field = data?.button1_url || null;
  const button1Text = data?.button1_text || button1Field?.title || "Book a Demo";
  const button1Url =
    button1Field?.url ||
    "https://meetings.hubspot.com/enterprisedemo/solution-consultation";
  const button1Target = button1Field?.target || "_self";

  // Button 2 (Talk to an Expert)
  const button2Field = data?.button2_url || null;
  const button2Text =
    data?.button2_text || button2Field?.title || "Talk to an Expert";
  const button2Url =
    button2Field?.url ||
    "https://meetings.hubspot.com/enterprisedemo/solution-consultation";
  const button2Target = button2Field?.target || "_self";

  return (
    <section className="section ctaSection" id="final-cta">
      <div className="heroGlow ctaGlow" />
      <div className="pageContainer ctaInner">
        <h2 className="ctaTitle">
          See what <span className="gradientText">qubi</span> can automate in your enterprise
        </h2>
        <p className="ctaDescription">{description}</p>
        <div className="heroActions ctaActions">
          <ActionButton href={button1Url} target={button1Target}>
            {button1Text}
            <ArrowRight size={18} />
          </ActionButton>
          <ActionButton
            href={button2Url}
            target={button2Target}
            variant="outline"
          >
            <MessageSquare size={16} />
            {button2Text}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
