import { Link, useLocation } from "react-router-dom";
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

export const Footer = () => {
  const ctaRef = useReveal<HTMLDivElement>();
  const { pathname } = useLocation();

  if (
    pathname === "/auth" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/esg-calculator")
  ) {
    return null;
  }

  // Refined groups: Removed dead links/placeholders
  const navGroups = [
    {
      heading: "Capabilities",
      links: [
        { name: "Services", path: "/services" },
        { name: "Industries", path: "/industries" },
        { name: "Case Studies", path: "/case-studies" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { name: "Insights", path: "/blog" },
        { name: "ESG Diagnostic", path: "/auth" }, // Directs to portal entry
        { name: "Client Login", path: "/auth" },
      ],
    },
    {
      heading: "The Firm",
      links: [
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Security", path: "/industries" }, // Mapping to a relevant context
      ],
    },
  ];

  return (
    <footer
      ref={ctaRef}
      className="w-full reveal-section border-t"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <div className="px-6 md:px-16 py-12 flex justify-center">
        {/* Adjusted to 3 columns for better spacing since we removed dead links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-3xl">
          {navGroups.map((group, i) => (
            <div
              key={group.heading}
              className="reveal-child flex flex-col items-center text-center"
              style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
            >
              <h3
                className="text-[10px] font-black uppercase tracking-[0.3em] mb-5"
                style={{ color: "var(--text-base)" }}
              >
                {group.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-[12px] font-medium opacity-70 hover:opacity-100 transition-opacity"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className="px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Link
          to="/"
          className="text-lg font-black tracking-tighter"
          style={{ color: "var(--text-base)" }}
        >
          CRUX<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <div className="flex items-center gap-4">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40"
            style={{ color: "var(--text-muted)" }}
          >
            © 2026 Crux Operations
          </span>
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
            System Nominal
          </span>
        </div>
      </div>
    </footer>
  );
};
