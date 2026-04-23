import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

const ENGAGEMENT_MODEL = [
  {
    week: "01-02",
    phase: "Discovery & Data Ingestion",
    desc: "We embed on-site, mirroring floor operations. We extract raw ERP data and map the physical flow of goods.",
  },
  {
    week: "03-04",
    phase: "Variance Analysis",
    desc: "Deploying DMAIC frameworks to isolate bottlenecks. We present the exact capital leakage, backed by raw data.",
  },
  {
    week: "05-08",
    phase: "Surgical Implementation",
    desc: "We rewrite supplier contracts, restructure warehouse layouts, and establish automated ESG reporting mechanisms.",
  },
  {
    week: "09-12",
    phase: "Control & Handoff",
    desc: "Internal team training and dashboard establishment to ensure efficiencies hold firm post-engagement.",
  },
];

const SERVICE_GRID = [
  {
    id: "01",
    category: "Supply Chain",
    title: "Vendor Consolidation",
    impact: "Risk Mitigation",
    desc: "Eliminate dependency on single-source suppliers. We leverage volume pricing and establish geopolitical redundancies.",
  },
  {
    id: "02",
    category: "Operations",
    title: "Six Sigma DMAIC",
    impact: "Defect Reduction",
    desc: "Rigorous statistical frameworks deployed directly onto factory floors to hunt variance and improve OEE.",
  },
  {
    id: "03",
    category: "Compliance",
    title: "ESG Quantification",
    impact: "Capital Attraction",
    desc: "Transform vague green goals into quantifiable metrics for institutional capital and regulatory compliance.",
  },
  {
    id: "04",
    category: "Working Capital",
    title: "JIT Restructuring",
    impact: "Cash Flow Release",
    desc: "Transition from reactive stockpiling to precision Just-In-Time fulfillment, eliminating warehousing overhead.",
  },
  {
    id: "05",
    category: "Procurement",
    title: "Spend Analytics",
    impact: "Margin Expansion",
    desc: "Deep spend analytics to control rogue expenditures and centralize procurement data for immediate margin improvement.",
  },
  {
    id: "06",
    category: "Logistics",
    title: "Freight Optimization",
    impact: "Cost Per Mile",
    desc: "Restructure outbound and inbound freight networks using optimal routing algorithms to reduce costs.",
  },
];

export const Services = () => {
  const headerRef = useReveal<HTMLDivElement>();
  const matrixRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const timelineRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const [, setHoveredService] = useState<string | null>(null);

  return (
    <main
      className="w-full flex flex-col pt-20"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* 1. HERO HEADER */}
      <section
        ref={headerRef}
        className="w-full pt-12 pb-20 md:pb-24 px-6 md:px-16 border-b reveal-section"
        style={borderStyle}
      >
        <div className="max-w-6xl reveal-child">
          <h1
            className="font-bold tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 7.5rem)",
              color: "var(--text-base)",
            }}
          >
            Architectural <br />
            <span style={{ color: "var(--text-muted)" }}>Overhaul.</span>
          </h1>
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-24 pt-8 border-t"
            style={borderStyle}
          >
            <p
              className="text-xl md:text-3xl font-light leading-snug tracking-tight md:w-2/3"
              style={{ color: "var(--text-base)" }}
            >
              We do not operate in theory. We execute mathematically grounded
              transformations designed to permanently alter your cost structure.
            </p>
            <div className="md:w-1/3 flex flex-col gap-6">
              <div>
                <span className="text-4xl font-light tracking-tighter block">
                  100%
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                  Implementation Rate
                </span>
              </div>
              <div>
                <span className="text-4xl font-light tracking-tighter block">
                  ₹85L+
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                  Avg. Client ROI within 12 Mo.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIAGNOSTIC MATRIX */}
      <section
        ref={matrixRef}
        className="w-full py-20 md:py-24 border-b reveal-section bg-[color:var(--bg-surface)]"
        style={borderStyle}
      >
        <div className="px-6 md:px-16 mb-12 md:mb-16 reveal-child">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-40">
            Symptom Identification
          </h2>
          <p className="text-2xl md:text-4xl font-light tracking-tight max-w-3xl">
            Operations bleed slowly through specific, identifiable symptoms.
          </p>
        </div>

        <div className="px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              symptom: "Excessive Air Freight Spend",
              cause: "Poor lead-time forecasting forcing expedited shipping.",
              solution: "JIT Restructuring",
            },
            {
              symptom: "Product Quality Variance",
              cause:
                "Lack of standardized DMAIC controls on the assembly line.",
              solution: "Six Sigma Integration",
            },
            {
              symptom: "Capital Rejection",
              cause:
                "Inability to provide auditable Scope 1 - 3 emissions data.",
              solution: "ESG Quantification",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 reveal-child"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <h4 className="text-lg font-medium">{item.symptom}</h4>
              </div>
              <p className="text-sm md:text-base font-light opacity-60">
                <span className="font-bold uppercase text-[9px] mr-2 opacity-50">
                  Root Cause:
                </span>{" "}
                {item.cause}
              </p>
              <div
                className="mt-4 pt-4 border-t flex justify-between items-center"
                style={borderStyle}
              >
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                  Intervention
                </span>
                <span className="text-xs font-mono">{item.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE SERVICES GRID */}
      <section
        ref={gridRef}
        className="w-full py-20 md:py-24 px-6 md:px-16 reveal-section"
      >
        <div className="mb-12 md:mb-16 reveal-child">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-40">
            Execution Pillars
          </h2>
          <p className="text-3xl md:text-5xl font-light tracking-tight">
            The Capabilities Matrix.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 border-t border-l"
          style={borderStyle}
        >
          {SERVICE_GRID.map((service, i) => (
            <div
              key={service.id}
              className="group p-8 md:p-16 border-b border-r flex flex-col justify-between min-h-[380px] transition-all duration-500 hover:bg-[color:var(--bg-surface)] reveal-child"
              style={{ ...borderStyle, transitionDelay: `${i * 0.05}s` }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-current opacity-40 group-hover:opacity-100 transition-opacity">
                  {service.category}
                </span>
                <span className="text-xl font-mono opacity-10">
                  [{service.id}]
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 group-hover:text-[color:var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg font-light opacity-60 mb-8">
                  {service.desc}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--accent)]">
                    Output: {service.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ENGAGEMENT TIMELINE */}
      <section
        ref={timelineRef}
        className="w-full py-20 md:py-24 border-t reveal-section bg-[color:var(--bg-surface)]"
        style={borderStyle}
      >
        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          <div className="mb-16 reveal-child text-center">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-[color:var(--accent)]">
              Turnaround Protocol
            </h2>
            <p className="text-2xl md:text-4xl font-light tracking-tight">
              12-Week Structural Integration.
            </p>
          </div>

          <div className="border-l ml-2 md:ml-8" style={borderStyle}>
            {ENGAGEMENT_MODEL.map((phase, i) => (
              <div
                key={i}
                className="relative pl-8 md:pl-16 py-8 md:py-10 border-b last:border-0 reveal-child"
                style={{ ...borderStyle, transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="absolute left-[-4px] top-12 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                  <div className="md:w-1/3">
                    <span className="text-[10px] font-mono opacity-30 block mb-1">
                      PHASE {phase.week}
                    </span>
                    <h4 className="text-xl font-medium tracking-tight">
                      {phase.phase}
                    </h4>
                  </div>
                  <p className="md:w-2/3 text-base md:text-lg font-light opacity-60 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIGHTENED CTA */}
      <section
        ref={ctaRef}
        className="w-full reveal-section border-t"
        style={borderStyle}
      >
        <div className="px-6 md:px-16 py-16 md:py-20 flex flex-col items-center text-center gap-10">
          <div className="reveal-child max-w-3xl">
            <h2
              className="font-bold tracking-tighter uppercase mb-6"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              Require a Custom Audit?
            </h2>
            <p className="text-base md:text-lg font-light mb-10 opacity-60">
              If your bottlenecks fall outside standard parameters, we can
              construct a bespoke diagnostic framework.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] border border-current hover:bg-[color:var(--text-base)] hover:text-[color:var(--bg-base)] transition-all cursor-pointer"
            >
              Engage Firm
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] group-hover:scale-150 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
