import { useEffect, useRef } from "react";
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

const INDUSTRIES = [
  {
    id: "01",
    sector: "Automotive & Parts",
    focus: "Tier-1/2 Integration",
    logic:
      "Just-In-Time (JIT) dependency is absolute. A 2-hour delay at a Tier-2 supplier can halt an entire OEM assembly line.",
    interventions: [
      "Lead-time synchronization",
      "Vendor consolidation",
      "Six Sigma variance control",
    ],
  },
  {
    id: "02",
    sector: "FMCG / Consumer Goods",
    focus: "High-Velocity Fulfillment",
    logic:
      "SKU proliferation and demand volatility require aggressive inventory posture adjustments and freight optimization.",
    interventions: [
      "Demand forecasting models",
      "Warehouse footprint reduction",
      "Route optimization",
    ],
  },
  {
    id: "03",
    sector: "Pharmaceuticals",
    focus: "Cold-Chain & Compliance",
    logic:
      "Strict regulatory requirements for Scope-3 emissions tracking and thermal integrity throughout the last mile.",
    interventions: [
      "ESG data quantification",
      "SLA audit for 3PL providers",
      "Automated compliance reporting",
    ],
  },
  {
    id: "04",
    sector: "Heavy Manufacturing",
    focus: "Throughput & Yield",
    logic:
      "Fixed-asset utilization is the primary margin driver. We focus on OEE (Overall Equipment Effectiveness) and downtime eradication.",
    interventions: [
      "DMAIC process auditing",
      "Maintenance workflow restructuring",
      "Capital equipment ROI analysis",
    ],
  },
  {
    id: "05",
    sector: "Consumer Electronics",
    focus: "Reverse Logistics & Lifecycle",
    logic:
      "Rapid depreciation cycles and high returns volume require surgical precision in inbound/outbound logistics flow.",
    interventions: [
      "Returns management restructuring",
      "Geopolitical sourcing risk audit",
      "Component lead-time mapping",
    ],
  },
];

export const Industries = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const sectorsRef = useReveal<HTMLDivElement>();

  return (
    <main
      className="w-full flex flex-col pt-20"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* 1. HERO SECTION */}
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
            Industry <br />
            <span style={{ color: "var(--text-muted)" }}>Verticals.</span>
          </h1>
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-24 pt-8 border-t"
            style={borderStyle}
          >
            <p
              className="text-xl md:text-3xl font-light leading-snug tracking-tight max-w-3xl"
              style={{ color: "var(--text-base)" }}
            >
              Operational bottlenecks are universal, but their context is
              vertical. We apply specialized logic to the unique pressures of
              five core industries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE SECTORS LEDGER */}
      <section ref={sectorsRef} className="w-full reveal-section">
        <div className="w-full flex flex-col">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={ind.id}
              className="flex flex-col lg:flex-row items-start border-b reveal-child group transition-all duration-500 hover:bg-[color:var(--bg-surface)]"
              style={{
                borderColor: "var(--border-color)",
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              {/* Left: Sector & Focus */}
              <div
                className="w-full lg:w-1/3 px-6 md:px-16 py-10 lg:py-20 lg:border-r border-b lg:border-b-0"
                style={borderStyle}
              >
                <span className="text-[10px] font-mono block mb-4 opacity-30">
                  [{ind.id}]
                </span>
                <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-4 group-hover:text-[color:var(--accent)] transition-colors">
                  {ind.sector}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 border border-[color:var(--accent)] text-[color:var(--accent)]">
                  {ind.focus}
                </span>
              </div>

              {/* Right: Logic & Interventions */}
              <div className="w-full lg:w-2/3 px-6 md:px-16 py-10 lg:py-20">
                <div className="max-w-3xl">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-40">
                    Industrial Logic
                  </h4>
                  <p className="text-lg md:text-2xl font-light leading-relaxed mb-10 md:mb-12">
                    {ind.logic}
                  </p>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 pt-8 border-t"
                    style={borderStyle}
                  >
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-40">
                        Key Interventions
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {ind.interventions.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="w-1 h-1 rounded-full bg-[color:var(--accent)]" />
                            <span className="text-sm md:text-base font-light opacity-80">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-end md:justify-end mt-8 md:mt-0">
                      <Link
                        to="/case-studies"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 group/link"
                      >
                        Access Performance Ledger{" "}
                        <span className="text-lg group-hover/link:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
