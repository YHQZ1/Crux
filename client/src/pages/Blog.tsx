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

const FEATURED_POST = {
  id: "BRF-001",
  category: "Supply Chain Strategy",
  date: "APR 2026",
  title:
    "The Death of Just-In-Case: Why Stockpiling is Killing Your Working Capital.",
  excerpt:
    "The 2024 global logistics crisis forced manufacturing firms into defensive stockpiling. Two years later, that 'safety net' has become a massive weight on balance sheets.",
  readTime: "8 MIN READ",
};

const POSTS = [
  {
    id: "BRF-002",
    category: "ESG Compliance",
    date: "MAR 2026",
    title: "Scope 3 Reporting: Beyond the Spreadsheet.",
    desc: "Understanding the data architecture required to automate emissions tracking across tier-2 and tier-3 vendors.",
    readTime: "6 MIN",
  },
  {
    id: "BRF-003",
    category: "Operations",
    date: "FEB 2026",
    title: "DMAIC in the Age of AI.",
    desc: "How machine learning models are augmenting traditional Six Sigma workflows on the factory floor.",
    readTime: "12 MIN",
  },
  {
    id: "BRF-004",
    category: "Procurement",
    date: "JAN 2026",
    title: "Geopolitical Redundancy.",
    desc: "A framework for identifying the 'Single Point of Failure' in your cross-border sourcing matrix.",
    readTime: "9 MIN",
  },
  {
    id: "BRF-005",
    category: "Tech Infrastructure",
    date: "DEC 2025",
    title: "The ERP Gap.",
    desc: "Why your current enterprise resource planning software is failing to provide real-time supply chain visibility.",
    readTime: "5 MIN",
  },
];

export const Blog = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const featuredRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

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
            Intelligence <br />
            <span style={{ color: "var(--text-muted)" }}>Briefings.</span>
          </h1>
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-24 pt-8 border-t"
            style={borderStyle}
          >
            <p
              className="text-xl md:text-3xl font-light leading-snug tracking-tight max-w-3xl"
              style={{ color: "var(--text-base)" }}
            >
              Analysis on the intersection of manufacturing, logistics, and
              technology. Direct from the managing partners.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="reveal-child">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--accent)] mb-6 block">
                Featured Analysis
              </span>
              <h2
                className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-6 md:mb-8"
                style={{ color: "var(--text-base)" }}
              >
                {FEATURED_POST.title}
              </h2>
              <p
                className="text-lg md:text-xl font-light leading-relaxed mb-8 md:mb-10 opacity-70"
                style={{ color: "var(--text-muted)" }}
              >
                {FEATURED_POST.excerpt}
              </p>
              <div className="flex items-center gap-8">
                <Link
                  to={`/blog/${FEATURED_POST.id}`}
                  className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-current pb-1 cursor-pointer transition-opacity hover:opacity-50"
                  style={{ color: "var(--text-base)" }}
                >
                  Read Analysis
                </Link>
                <span
                  className="text-[10px] md:text-xs font-mono opacity-40 uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {FEATURED_POST.readTime}
                </span>
              </div>
            </div>

            <div
              className="reveal-child hidden lg:block"
              style={{ transitionDelay: "0.15s" }}
            >
              <div
                className="aspect-[4/3] border p-10 flex flex-col justify-between"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                {/* 1. Header Brackets & Scanner Status */}
                <div className="flex justify-between items-start pointer-events-none">
                  <div className="space-y-1">
                    <div
                      className="w-12 h-[1px]"
                      style={{ backgroundColor: "currentColor", opacity: 0.1 }}
                    />
                    <span
                      className="text-[9px] font-mono uppercase tracking-[0.25em]"
                      style={{ color: "var(--text-muted)", opacity: 0.5 }}
                    >
                      Scan_Protocol_Active
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.3em]"
                    style={{ color: "var(--text-muted)", opacity: 0.2 }}
                  >
                    [Visual_Int]
                  </span>
                </div>

                {/* 2. Abstract Node Network SVG */}
                <div className="relative flex-grow flex items-center justify-center p-6 opacity-30">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 200 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Connection Lines (Supply Routes) */}
                    <path
                      d="M40 30L80 70M80 70L120 40M120 40L160 80M160 80L120 110M120 110L80 70"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M40 30L60 90M60 90L120 110"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />

                    {/* Dynamic Trace Element (Moving Asset) */}
                    <circle cx="80" cy="70" r="3" fill="var(--accent)" />
                    <path
                      d="M80 70L120 40"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      className="animate-pulse"
                    />

                    {/* Key Nodes (Manufacturing Hubs) */}
                    <rect
                      x="36"
                      y="26"
                      width="8"
                      height="8"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      fill="var(--bg-surface)"
                    />
                    <rect
                      x="76"
                      y="66"
                      width="8"
                      height="8"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      fill="var(--bg-surface)"
                    />
                    <rect
                      x="116"
                      y="36"
                      width="8"
                      height="8"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      fill="var(--bg-surface)"
                    />
                    <rect
                      x="156"
                      y="76"
                      width="8"
                      height="8"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      fill="var(--bg-surface)"
                    />
                    <rect
                      x="56"
                      y="86"
                      width="8"
                      height="8"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      fill="var(--bg-surface)"
                    />
                    <rect
                      x="116"
                      y="106"
                      width="8"
                      height="8"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      fill="var(--bg-surface)"
                    />

                    {/* Secondary Nodes (Logistics Points) */}
                    <circle
                      cx="100"
                      cy="90"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <circle
                      cx="140"
                      cy="60"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <circle
                      cx="100"
                      cy="20"
                      r="1.5"
                      fill="currentColor"
                      opacity="0.4"
                    />
                  </svg>
                </div>

                {/* 3. Footer Brackets & Security ID */}
                <div className="flex justify-between items-end pointer-events-none">
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.25em]"
                    style={{ color: "var(--text-muted)", opacity: 0.5 }}
                  >
                    CRX_LEDGER.DATA.001
                  </span>
                  <div className="space-y-1 flex flex-col items-end">
                    <span
                      className="text-[9px] font-mono uppercase tracking-[0.25em]"
                      style={{ color: "var(--text-muted)", opacity: 0.5 }}
                    >
                      // Authorized Access Only //
                    </span>
                    <div
                      className="w-12 h-[1px]"
                      style={{ backgroundColor: "currentColor", opacity: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={listRef} className="w-full py-16 md:py-24 reveal-section">
        <div className="px-6 md:px-16 mb-12 md:mb-16 reveal-child">
          <h2
            className="text-xs md:text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            The Ledger
          </h2>
        </div>

        <div className="w-full flex flex-col border-t" style={borderStyle}>
          {POSTS.map((post, i) => (
            <div
              key={post.id}
              className="group flex flex-col md:flex-row items-start md:items-center py-10 md:py-12 px-6 md:px-16 border-b transition-all hover:bg-[color:var(--text-base)] hover:text-[color:var(--bg-base)] reveal-child"
              style={{ ...borderStyle, transitionDelay: `${i * 0.05}s` }}
            >
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <span className="text-[10px] font-mono block mb-1 opacity-40">
                  {post.date}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent)] group-hover:text-current transition-colors">
                  {post.category}
                </span>
              </div>

              <div className="w-full md:w-2/4 pr-0 md:pr-12">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
                  {post.title}
                </h3>
                <p className="text-sm md:text-base font-light opacity-60 line-clamp-1 group-hover:opacity-100 transition-opacity">
                  {post.desc}
                </p>
              </div>

              <div className="w-full md:w-1/4 flex justify-between items-center md:justify-end gap-12 mt-6 md:mt-0">
                <span className="text-[10px] font-mono opacity-40">
                  {post.readTime}
                </span>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-xs font-bold uppercase tracking-widest cursor-pointer border border-current px-4 py-2 group-hover:bg-[color:var(--bg-base)] group-hover:text-[color:var(--text-base)] transition-all"
                >
                  Access
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
