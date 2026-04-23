import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

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

export const Contact = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Manufacturing",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "Manufacturing",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b py-3 outline-none focus:border-[color:var(--accent)] transition-all text-lg font-light placeholder:opacity-20";
  const labelClass =
    "text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 block mb-1";

  return (
    <main
      className="w-full flex flex-col pt-20"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* 1. HERO HEADER */}
      <section
        ref={heroRef}
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
            Initiate <br />
            <span style={{ color: "var(--text-muted)" }}>Discovery.</span>
          </h1>
          <p
            className="text-xl md:text-3xl font-light leading-snug tracking-tight max-w-2xl opacity-80"
            style={{ color: "var(--text-base)" }}
          >
            Our partners review all inquiries personally. Let's discuss your
            operational architecture and efficiency gaps.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INTERFACE */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Contact Info (4 Columns) */}
        <div
          className="lg:col-span-4 px-6 md:px-16 py-16 lg:py-24 border-b lg:border-b-0 lg:border-r bg-[color:var(--bg-surface)]"
          style={borderStyle}
        >
          <div className="flex flex-col gap-12 sticky top-32">
            <div>
              <h3 className={labelClass}>Direct Line</h3>
              <a
                href="mailto:hello@cruxops.in"
                className="text-xl md:text-2xl font-light hover:text-[color:var(--accent)] transition-colors"
              >
                hello@cruxops.in
              </a>
            </div>

            <div>
              <h3 className={labelClass}>HQ Location</h3>
              <p className="text-xl md:text-2xl font-light leading-snug">
                Symbiosis SIT, Lavale,
                <br />
                Pune, MH 412115
              </p>
            </div>

            <div className="pt-10 border-t" style={borderStyle}>
              <h3 className={labelClass}>Engagement Status</h3>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                  Now accepting Q3 projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Form (8 Columns) */}
        <div className="lg:col-span-8 px-6 md:px-20 lg:px-32 py-16 lg:py-24">
          {status === "success" ? (
            <div className="h-full flex flex-col justify-center min-h-[400px]">
              <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4">
                Transmission Sent.
              </h2>
              <p className="text-lg font-light opacity-60 mb-10 max-w-md">
                Your inquiry has been logged in our system. A managing partner
                will contact you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs font-bold uppercase tracking-widest border-b border-current pb-1 w-fit cursor-pointer hover:opacity-50 transition-opacity"
              >
                Send another dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <label className={labelClass}>Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={borderStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Work Email</label>
                  <input
                    required
                    type="email"
                    placeholder="name@enterprise.com"
                    className={inputClass}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={borderStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <label className={labelClass}>Company</label>
                  <input
                    required
                    type="text"
                    placeholder="Organization Name"
                    className={inputClass}
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    style={borderStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Inquiry Focus</label>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer rounded-none`}
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    style={borderStyle}
                  >
                    <option value="Manufacturing">
                      Manufacturing Strategy
                    </option>
                    <option value="Logistics">Logistics Optimization</option>
                    <option value="FinTech">Financial Infrastructure</option>
                    <option value="ESG">ESG & Compliance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Brief Project Overview</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the operational bottleneck..."
                  className={inputClass}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={borderStyle}
                />
              </div>

              {status === "error" && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                  Error dispatching form. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-5 cursor-pointer text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[color:var(--bg-base)] flex items-center justify-center gap-4 border border-[color:var(--text-base)]"
                style={{ color: "var(--text-base)" }}
              >
                {status === "loading" ? "Processing..." : "Submit Inquiry"}
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
