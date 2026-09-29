// Generic per-industry glyph shown in the hero polaroid card when the client
// has no logo image (name-withheld case studies). Matched by keyword against
// the "client_industry" ACF field, falling back to a generic briefcase.
const ICONS = {
  energy: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  ),
  healthcare: (
    <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1.2 4 2.5C10.5 6.2 12 5 14 5c3.5 0 5.5 3.5 3.5 7.5C15 16.65 12 21 12 21Z" />
  ),
  financial: (
    <>
      <path d="M3 21h18M4 21V10M20 21V10M2 10l10-6 10 6M8 10v11M12 10v11M16 10v11" />
    </>
  ),
  manufacturing: (
    <path d="M3 21V10l5 3V9l5 3V6l6 4v11H3Z" />
  ),
  logistics: (
    <>
      <path d="M3 16V6h9v10" />
      <path d="M12 10h4l4 4v2h-8" />
      <circle cx="6.5" cy="18.5" r="1.8" />
      <circle cx="16.5" cy="18.5" r="1.8" />
    </>
  ),
  insurance: (
    <path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Z" />
  ),
  realestate: (
    <path d="M4 21V9l8-6 8 6v12h-5v-7h-6v7H4Z" />
  ),
  technology: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  default: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
};

function matchIcon(industry) {
  const s = (industry || '').toLowerCase();
  if (s.includes('energy') || s.includes('turbine')) return ICONS.energy;
  if (s.includes('health')) return ICONS.healthcare;
  if (s.includes('financ') || s.includes('bank') || s.includes('payment')) return ICONS.financial;
  if (s.includes('manufactur')) return ICONS.manufacturing;
  if (s.includes('logistic') || s.includes('transport') || s.includes('supply')) return ICONS.logistics;
  if (s.includes('insur')) return ICONS.insurance;
  if (s.includes('real estate') || s.includes('realty')) return ICONS.realestate;
  if (s.includes('tech')) return ICONS.technology;
  return ICONS.default;
}

export default function IndustryIcon({ industry }) {
  return (
    <svg
      className="css-industry-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {matchIcon(industry)}
    </svg>
  );
}
