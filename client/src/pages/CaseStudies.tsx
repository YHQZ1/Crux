import { useEffect, useRef } from "react";

function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const borderStyle = { borderColor: "var(--border-color)" };

const FEATURED_CASE = {
  id: "ENG-084",
  sector: "Automotive Manufacturing",
  client: "Tier-1 OEM Parts Supplier",
  duration: "14 Weeks",
  headline:
    "Restructuring a cross-border supplier network to survive geopolitical shocks.",
  context:
    "The client was overly reliant on a single geographic region for aluminum extrusions. A minor localized shipping delay caused a 14-day production halt, costing ₹42Cr.",
  intervention:
    "We audited the tier-1 and tier-2 vendor base, dismantled single-source contracts, and onboarded localized suppliers using volume-pooling algorithms to maintain pricing.",
  metrics: [
    { label: "Procurement Cost", value: "—22%" },
    { label: "Lead Time Variance", value: "—84%" },
    { label: "Production Halts", value: "0" },
  ],
};

const CASE_INDEX = [
  {
    id: "ENG-092",
    sector: "FMCG / Beverage",
    duration: "8 Weeks",
    headline: "JIT retrofit for a 6-site manufacturing conglomerate.",
    challenge:
      "Bloated warehousing overhead due to reactive, fear-based stockpiling of raw materials.",
    solution:
      "Mapped precise lead times and integrated predictive demand models to transition to Just-In-Time fulfillment.",
    primary_metric: "₹28Cr",
    primary_label: "Freed Working Capital",
  },
  {
    id: "ENG-071",
    sector: "Heavy Machinery",
    duration: "12 Weeks",
    headline: "Eradicating assembly line variance via Six Sigma DMAIC.",
    challenge:
      "A 4.2% defect rate on critical engine components was causing massive reverse-logistics costs.",
    solution:
      "Standardized operational protocols and recalibrated equipment via Master Black Belt oversight.",
    primary_metric: "—40%",
    primary_label: "Defect Rate Reduction",
  },
  {
    id: "ENG-104",
    sector: "Pharma Logistics",
    duration: "10 Weeks",
    headline: "Cold-chain ESG audit and ISO 14001 certification path.",
    challenge:
      "Tier-1 European buyers required auditable Scope 3 data, threatening contract termination.",
    solution:
      "Built a custom carbon-tracking dashboard mapped to ERP, automating compliance reporting.",
    primary_metric: "100%",
    primary_label: "Compliance Achieved",
  },
  {
    id: "ENG-112",
    sector: "Consumer Electronics",
    duration: "6 Weeks",
    headline: "Inbound freight optimization and 3PL renegotiation.",
    challenge:
      "Volatile fuel surcharges and poor routing logic led to an 18% spike in inbound freight costs.",
    solution:
      "Modeled routing algorithms and renegotiated SLAs with existing 3PL partners.",
    primary_metric: "—15%",
    primary_label: "Cost Per Mile",
  },
];

export const CaseStudies = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const featuredRef = useReveal<HTMLDivElement>();
  const indexRef = useReveal<HTMLDivElement>();

  return (
    <main
      className="w-full flex flex-col pt-20"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <section
        ref={heroRef}
        className="w-full pt-12 pb-20 md:pb-24 px-6 md:px-16 border-b reveal-section"
        style={borderStyle}
      >
        <div className="max-w-6xl reveal-child">
          <h1
            className="font-bold tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              color: "var(--text-base)",
            }}
          >
            Outcomes. <br />
            <span style={{ color: "var(--text-muted)" }}>Recorded.</span>
          </h1>
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-24 pt-8 border-t"
            style={borderStyle}
          >
            <p
              className="text-xl md:text-3xl font-light leading-snug tracking-tight max-w-3xl"
              style={{ color: "var(--text-base)" }}
            >
              We measure our success by the capital we free, the variance we
              eliminate, and the margins we expand.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={featuredRef}
        className="w-full py-20 md:py-24 border-b reveal-section"
        style={borderStyle}
      >
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="mb-12 reveal-child">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 border mb-6 inline-block"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--accent)",
              }}
            >
              Verified Deployment: {FEATURED_CASE.id}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div
              className="lg:w-1/2 reveal-child"
              style={{ transitionDelay: "0.1s" }}
            >
              <div
                className="flex items-center justify-between border-b pb-4 mb-8"
                style={borderStyle}
              >
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                  {FEATURED_CASE.sector}
                </span>
                <span className="text-[10px] font-mono opacity-30">
                  REF_AUTH_SECURED
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8"
                style={{ color: "var(--text-base)" }}
              >
                {FEATURED_CASE.headline}
              </h2>
              <div className="flex flex-col gap-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40">
                    Problem Context
                  </h4>
                  <p className="text-lg font-light leading-relaxed opacity-70">
                    {FEATURED_CASE.context}
                  </p>
                </div>
                <div>
                  <h4
                    className="text-[10px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Strategic Intervention
                  </h4>
                  <p className="text-lg font-light leading-relaxed">
                    {FEATURED_CASE.intervention}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="lg:w-1/2 reveal-child"
              style={{ transitionDelay: "0.2s" }}
            >
              <div
                className="p-8 md:p-12 border"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-12 text-center opacity-40">
                  Performance Metrics
                </h4>
                <div className="flex flex-col gap-8">
                  {FEATURED_CASE.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-end justify-between border-b pb-4"
                      style={borderStyle}
                    >
                      <span className="text-base md:text-lg font-light opacity-60">
                        {metric.label}
                      </span>
                      <span
                        className="text-4xl md:text-6xl font-light tracking-tighter"
                        style={{ color: "var(--text-base)" }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-12 flex items-center justify-between pt-6 border-t"
                  style={borderStyle}
                >
                  <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">
                    Time to ROI:
                  </span>
                  <span className="text-xs font-bold tracking-[0.1em] uppercase">
                    {FEATURED_CASE.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={indexRef} className="w-full py-20 md:py-24 reveal-section">
        <div className="px-6 md:px-16 mb-12 md:mb-16 reveal-child">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-40 mb-4">
            Historical Archive
          </h2>
          <p className="text-3xl md:text-4xl font-light tracking-tight">
            Operations Ledger
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l"
          style={borderStyle}
        >
          {CASE_INDEX.map((c, i) => (
            <div
              key={c.id}
              className="p-8 md:p-16 border-b border-r flex flex-col justify-between group hover:bg-[color:var(--text-base)] hover:text-[color:var(--bg-base)] transition-all reveal-child"
              style={{ ...borderStyle, transitionDelay: `${i * 0.05}s` }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--accent)] group-hover:text-current transition-colors">
                    {c.sector}
                  </span>
                  <span className="text-[10px] font-mono opacity-30">
                    [{c.id}]
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light leading-snug tracking-tight mb-8">
                  {c.headline}
                </h3>
                <div className="space-y-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm md:text-base font-light">
                    <span className="font-bold uppercase text-[9px] tracking-widest mr-2 opacity-50">
                      Issue:
                    </span>{" "}
                    {c.challenge}
                  </p>
                  <p className="text-sm md:text-base font-light">
                    <span className="font-bold uppercase text-[9px] tracking-widest mr-2 opacity-50">
                      Fix:
                    </span>{" "}
                    {c.solution}
                  </p>
                </div>
              </div>

              <div
                className="mt-12 flex items-end justify-between pt-8 border-t group-hover:border-current/20"
                style={borderStyle}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-40 group-hover:opacity-60">
                    {c.primary_label}
                  </span>
                  <span className="text-3xl md:text-5xl font-light tracking-tighter">
                    {c.primary_metric}
                  </span>
                </div>
                <span className="text-[10px] font-mono opacity-30">
                  {c.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
