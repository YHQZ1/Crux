import { Link } from "react-router-dom";
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

function HexVisual() {
  const NODES = [
    { label: "Vendor", cx: 160, cy: 20 },
    { label: "Six Sigma", cx: 281.24, cy: 90 },
    { label: "JIT", cx: 281.24, cy: 230 },
    { label: "ESG", cx: 160, cy: 300 },
    { label: "Audit", cx: 38.76, cy: 230 },
    { label: "Risk", cx: 38.76, cy: 90 },
  ];

  const polygonPoints = NODES.map((n) => `${n.cx},${n.cy}`).join(" ");

  return (
    <svg
      viewBox="0 0 320 320"
      className="w-[85%] max-w-[360px] relative z-10 overflow-visible"
    >
      <circle
        cx="160"
        cy="160"
        r="140"
        fill="none"
        stroke="var(--border-color)"
        strokeWidth="1"
        opacity="0.4"
      />
      <g className="animate-[spin_40s_linear_infinite] origin-center">
        {NODES.map((n, i) => (
          <line
            key={`spoke-${i}`}
            x1="160"
            y1="160"
            x2={n.cx}
            y2={n.cy}
            stroke="var(--border-color)"
            strokeWidth="1.5"
          />
        ))}
        <polygon
          points={polygonPoints}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <polygon
          points={polygonPoints}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          className="animate-trace"
        />
        {NODES.map((n, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r="26"
              fill="var(--bg-base)"
              stroke="var(--border-color)"
              strokeWidth="1.5"
            />
            <text
              x={n.cx}
              y={n.cy + 3}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              letterSpacing="0.08em"
              fill="var(--text-base)"
              className="animate-[spin_40s_linear_infinite_reverse]"
              style={{
                textTransform: "uppercase",
                transformOrigin: `${n.cx}px ${n.cy}px`,
              }}
            >
              {n.label}
            </text>
          </g>
        ))}
        <circle cx="160" cy="160" r="8" fill="var(--accent)" />
      </g>
    </svg>
  );
}

const CASES = [
  {
    id: "001",
    sector: "FinTech",
    headline:
      "Financial ledger restructuring and multi-tenant database migration.",
    result: "Zero-Downtime scaling",
    year: "2026",
  },
  {
    id: "002",
    sector: "DevOps",
    headline: "Infrastructure automation and AWS ECS deployment scaling.",
    result: "—40% server costs",
    year: "2026",
  },
  {
    id: "003",
    sector: "AI / HR Tech",
    headline: "LLM-integrated resume screening and skills mapping algorithm.",
    result: "98% matching accuracy",
    year: "2026",
  },
];

const LOGOS = [
  "zomato",
  "swiggy",
  "paytm",
  "razorpay",
  "postman",
  "zoho",
  "tata",
  "jio",
  "infosys",
  "hasura",
  "polygon",
  "airtel",
  "oyo",
];
const MARQUEE = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export const Home = () => {
  const metricsRef = useReveal<HTMLDivElement>();
  const philosophyRef = useReveal<HTMLDivElement>();
  const capabilitiesRef = useReveal<HTMLDivElement>();
  const casesRef = useReveal<HTMLDivElement>();

  return (
    <main className="w-full flex flex-col pt-0">
      {/* 1. HERO */}
      <section
        className="w-full min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 relative border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-col justify-center px-6 md:px-16 py-16 relative z-10">
          <div
            className="flex items-center gap-3 mb-10 hero-fade opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="w-2 h-2"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-sm font-bold uppercase tracking-widest opacity-60">
              Accepting New Engagements — Q3 2026
            </span>
          </div>
          <h1
            className="tracking-tighter leading-[0.85] uppercase mb-10 hero-fade opacity-0"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: "var(--text-base)",
              animationDelay: "0.2s",
            }}
          >
            Operations.
            <br />
            <span style={{ color: "var(--accent)" }}>Refined.</span>
          </h1>
          <p
            className="text-2xl md:text-3xl max-w-2xl font-light leading-snug tracking-tight mb-12 hero-fade opacity-0 opacity-70"
            style={{ animationDelay: "0.3s" }}
          >
            We engineer resilient supply chains and exact operational precision.{" "}
            <span
              className="font-medium opacity-100"
              style={{ color: "var(--text-base)" }}
            >
              No fluff. Just yield.
            </span>
          </p>
          <div
            className="flex items-center gap-10 hero-fade opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Link
              to="/esg-calculator"
              className="group inline-flex items-center gap-4 text-base font-bold uppercase tracking-widest w-fit"
            >
              <span className="pb-1 border-b-2 border-transparent group-hover:border-[color:var(--accent)] transition-colors">
                Run ESG Diagnostic
              </span>
              <span className="w-8 h-px bg-current group-hover:w-12 group-hover:bg-[color:var(--accent)] transition-all duration-300" />
            </Link>
          </div>
        </div>
        <div
          className="hidden lg:flex items-center justify-center relative overflow-hidden py-16 border-l"
          style={{ borderColor: "var(--border-color)" }}
        >
          <HexVisual />
        </div>
      </section>

      {/* 2. MARQUEE */}
      <div
        className="w-full overflow-hidden py-12 border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="marquee-track flex gap-24 items-center">
          {MARQUEE.map((logo, i) => (
            <img
              key={i}
              src={`https://cdn.simpleicons.org/${logo}/a1a1aa`}
              alt={logo}
              className="h-10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* 3. METRICS */}
      <section ref={metricsRef} className="w-full py-20 reveal-section">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-12 px-6 md:px-16">
          {[
            { metric: "₹1,000Cr+", label: "Capital Freed" },
            { metric: "140+", label: "Audits Executed" },
            { metric: "35%", label: "Cycle Reduction" },
            { metric: "100%", label: "Compliance Rate" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center md:items-start gap-4 reveal-child"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                {stat.label}
              </span>
              <span
                className="font-light tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
              >
                {stat.metric}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PHILOSOPHY */}
      <section
        ref={philosophyRef}
        className="w-full pt-10 py-24 reveal-section border-t bg-[color:var(--bg-surface)]"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="px-6 md:px-16 mb-24 reveal-child text-center flex flex-col items-center">
          <span
            className="text-sm font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: "var(--accent)" }}
          >
            Our Thesis
          </span>
          <blockquote className="text-3xl md:text-6xl font-light leading-tight max-w-5xl tracking-tight">
            "Strategy is a commodity. Execution is an art. We do not sell slide
            decks — we{" "}
            <span className="text-[color:var(--accent)]">
              rewire factory floors.
            </span>
            "
          </blockquote>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-6 md:px-16">
          {["Diagnose", "Dismantle", "Deploy"].map((title, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 reveal-child"
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="font-mono text-base"
                  style={{ color: "var(--accent)" }}
                >
                  [{i + 1}]
                </span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                  {title}
                </span>
              </div>
              <p className="text-lg font-light leading-relaxed opacity-70">
                {i === 0 &&
                  "We embed within operations for 2–4 weeks before writing a single recommendation. Every hypothesis is stress-tested against actual data."}
                {i === 1 &&
                  "Legacy processes, bloated vendor lists, misaligned KPIs — we remove what doesn't earn its place. Even when uncomfortable."}
                {i === 2 &&
                  "We stay on-site until the change holds under real operating pressure. Implementations are managed to a strict milestone schedule."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CAPABILITIES */}
      <section
        ref={capabilitiesRef}
        className="w-full px-6 md:px-16 py-24 reveal-section border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="w-full flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 lg:w-1/4 reveal-child">
            Core Capabilities
          </h2>
          <p className="text-4xl md:text-5xl max-w-4xl font-light leading-tight tracking-tight lg:w-3/4 reveal-child">
            We audit, dismantle, and rebuild operational workflows with
            mathematical certainty.
          </p>
        </div>
        <div
          className="w-full flex flex-col border-t"
          style={{ borderColor: "var(--border-color)" }}
        >
          {[
            {
              id: "01",
              title: "Vendor Architecture",
              desc: "Consolidate supplier networks to leverage volume pricing while ensuring geopolitical redundancies.",
            },
            {
              id: "02",
              title: "Six Sigma Integration",
              desc: "Deploying DMAIC methodologies across assembly lines to ruthlessly hunt and eradicate variance.",
            },
            {
              id: "03",
              title: "ESG Data & Compliance",
              desc: "Transform vague goals into auditable metrics for enterprise compliance and institutional capital.",
            },
            {
              id: "04",
              title: "JIT Inventory Systems",
              desc: "Establish precision lead-time mapping to establish JIT flows that free massive working capital.",
            },
          ].map((s, i) => (
            <div
              key={s.id}
              className="flex flex-col md:flex-row items-start py-12 border-b hover:bg-[color:var(--bg-surface)] transition-all reveal-child px-4"
              style={{
                borderColor: "var(--border-color)",
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <span className="text-2xl font-mono w-24 mb-4 md:mb-0 opacity-20">
                [{s.id}]
              </span>
              <div className="w-full md:w-1/2 pr-8 mb-4 md:mb-0">
                <h3
                  className="font-light tracking-tight group-hover:text-[color:var(--accent)] transition-colors"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
                >
                  {s.title}
                </h3>
              </div>
              <div className="w-full md:w-1/3 ml-auto">
                <p className="text-lg font-light leading-relaxed opacity-60">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SELECTED WORK */}
      <section
        ref={casesRef}
        className="w-full px-6 md:px-16 py-24 reveal-section border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="mb-16 reveal-child">
          <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6 block">
            Case Studies
          </span>
          <p className="text-4xl md:text-5xl font-light tracking-tight">
            Outcomes, not effort.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {CASES.map((c, i) => (
            <div
              key={c.id}
              className="p-10 border bg-[color:var(--bg-surface)] hover:border-[color:var(--accent)] transition-all reveal-child flex flex-col justify-between min-h-[340px]"
              style={{
                borderColor: "var(--border-color)",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent)]">
                    {c.sector}
                  </span>
                  <span className="text-xs font-mono opacity-40">{c.year}</span>
                </div>
                <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight mb-8">
                  {c.headline}
                </p>
              </div>
              <div
                className="flex items-end justify-between pt-6 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <span className="text-xl font-bold tracking-tight">
                  {c.result}
                </span>
                <span className="text-[10px] font-mono opacity-20 uppercase">
                  SECURE_REF_{c.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
