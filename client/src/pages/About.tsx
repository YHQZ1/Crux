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

const TEAM = [
  {
    name: "Uttkarsh Ruparel",
    title: "Managing Partner",
    focus: "Technology Infrastructure & Data Architecture",
    bio: "Specializes in building high-throughput, low-latency systems for global supply chains. Leads the digital transformation and proprietary tool development for Crux.",
  },
  {
    name: "Jeel Patel",
    title: "Partner",
    focus: "Vendor Consolidation & Risk Mitigation",
    bio: "Ex-tier-1 procurement lead. Architected cross-border supplier networks that survived major geopolitical shocks. Focuses on aggressively expanding client margins.",
  },
  {
    name: "Kisna Kanti",
    title: "Partner",
    focus: "Six Sigma & Factory Floor Operations",
    bio: "Certified Master Black Belt. Spends more time on assembly lines than in boardrooms. Responsible for eradicating variance and implementing DMAIC controls.",
  },
  {
    name: "Rut Vaghani",
    title: "Partner",
    focus: "ESG Quantification & Compliance",
    bio: "Translates complex regulatory requirements into operational workflows. Built the framework that maps Scope 1-3 emissions to exact working capital metrics.",
  },
];

const PRINCIPLES = [
  {
    id: "01",
    title: "Truth in Data.",
    desc: "We do not guess. We do not rely on industry intuition. Every hypothesis is modeled, tested, and proven against your raw operational data before a single recommendation is made.",
  },
  {
    id: "02",
    title: "Execution over Theory.",
    desc: "Consultancies sell slide decks. We sell implementation. If a strategy cannot be executed on the factory floor by your existing workforce, it is discarded.",
  },
  {
    id: "03",
    title: "Uncomfortable Clarity.",
    desc: "We will not tell you what you want to hear. We will highlight bloated vendor lists, misaligned KPIs, and legacy processes that need to be dismantled.",
  },
];

export const About = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const storyRef = useReveal<HTMLDivElement>();
  const principlesRef = useReveal<HTMLDivElement>();
  const teamRef = useReveal<HTMLDivElement>();

  return (
    <main
      className="w-full flex flex-col pt-20 overflow-x-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <section
        ref={heroRef}
        className="w-full pt-12 pb-20 md:pb-24 px-6 md:px-16 border-b reveal-section"
        style={borderStyle}
      >
        <div className="max-w-6xl reveal-child">
          <h1
            className="font-black tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              color: "var(--text-base)",
            }}
          >
            Built by <br />
            <span style={{ color: "var(--text-muted)" }}>Operators.</span>
          </h1>
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-24 pt-8 border-t"
            style={borderStyle}
          >
            <p
              className="text-xl md:text-3xl font-light leading-snug tracking-tight max-w-3xl"
              style={{ color: "var(--text-base)" }}
            >
              We founded CRUX because we were tired of generic strategy. We are
              engineers, procurement leads, and supply chain architects who
              actually know how to build and dismantle complex systems.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={storyRef}
        className="w-full py-20 md:py-32 px-6 md:px-16 reveal-section"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-7xl mx-auto">
          <div className="lg:w-1/2 reveal-child">
            <h2
              className="text-xs md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              The Industry Problem
            </h2>
            <p
              className="text-2xl md:text-5xl font-light tracking-tight mb-6 md:mb-8"
              style={{ color: "var(--text-base)" }}
            >
              The consulting illusion.
            </p>
            <p
              className="text-base md:text-lg font-light leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Traditional advisory firms deploy junior analysts to aggregate
              industry averages, wrap them in expensive slide decks, and leave
              the client to figure out how to actually implement the changes.
            </p>
          </div>

          <div
            className="lg:w-1/2 reveal-child"
            style={{ transitionDelay: "0.15s" }}
          >
            <h2
              className="text-xs md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6"
              style={{ color: "var(--accent)" }}
            >
              The Crux Reality
            </h2>
            <p
              className="text-2xl md:text-5xl font-light tracking-tight mb-6 md:mb-8"
              style={{ color: "var(--text-base)" }}
            >
              Architectural overhaul.
            </p>
            <p
              className="text-base md:text-lg font-light leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              We do not deliver reports; we deliver outcomes. We embed directly
              into your operations, trace the raw data flow, and stay on-site
              until the variance is eradicated.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={principlesRef}
        className="w-full py-20 md:py-24 border-t reveal-section"
        style={{ ...borderStyle, backgroundColor: "var(--bg-surface)" }}
      >
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 reveal-child">
            <h2
              className="text-xs md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6"
              style={{ color: "var(--accent)" }}
            >
              Core Tenets
            </h2>
            <p
              className="text-3xl md:text-6xl font-light tracking-tight"
              style={{ color: "var(--text-base)" }}
            >
              How we govern our engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {PRINCIPLES.map((principle, i) => (
              <div
                key={principle.id}
                className="reveal-child flex flex-col"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span
                  className="text-4xl md:text-7xl font-light tracking-tighter mb-6 md:mb-8"
                  style={{ color: "var(--accent)", opacity: 0.8 }}
                >
                  {principle.id}
                </span>
                <h3
                  className="text-xl md:text-2xl font-medium tracking-tight mb-3 md:mb-4"
                  style={{ color: "var(--text-base)" }}
                >
                  {principle.title}
                </h3>
                <p
                  className="text-base md:text-lg font-light leading-relaxed opacity-70"
                  style={{ color: "var(--text-muted)" }}
                >
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={teamRef} className="w-full py-20 md:py-32 reveal-section">
        <div className="px-6 md:px-16 mb-12 md:mb-20 reveal-child">
          <h2
            className="text-xs md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Leadership
          </h2>
          <p
            className="text-3xl md:text-6xl font-light tracking-tight"
            style={{ color: "var(--text-base)" }}
          >
            The Managing Partners.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l"
          style={borderStyle}
        >
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="p-8 md:p-16 border-b border-r flex flex-col reveal-child"
              style={{ ...borderStyle, transitionDelay: `${i * 0.08}s` }}
            >
              <div className="mb-8 md:mb-12">
                <span
                  className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: "var(--accent)" }}
                >
                  {member.title}
                </span>
                <h3
                  className="text-2xl md:text-4xl font-light tracking-tight"
                  style={{ color: "var(--text-base)" }}
                >
                  {member.name}
                </h3>
              </div>
              <div
                className="mt-auto pt-6 md:pt-8 border-t"
                style={borderStyle}
              >
                <p
                  className="text-[10px] md:text-sm font-bold uppercase tracking-widest mb-3 md:mb-4"
                  style={{ color: "var(--text-base)" }}
                >
                  Focus: {member.focus}
                </p>
                <p
                  className="text-base md:text-lg font-light leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
