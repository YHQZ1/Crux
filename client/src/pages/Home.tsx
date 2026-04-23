import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Package,
  Leaf,
  ChevronRight,
} from "lucide-react";

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "40%", label: "Avg. Cost Reduction" },
  { value: "15+", label: "Industries Served" },
  { value: "98%", label: "Client Retention" },
];

const services = [
  {
    icon: Package,
    id: "01",
    title: "Supply Chain Management",
    desc: "End-to-end visibility and optimization across your entire supply network.",
  },
  {
    icon: Shield,
    id: "02",
    title: "Vendor Development",
    desc: "Build resilient supplier ecosystems that scale with your business.",
  },
  {
    icon: Zap,
    id: "03",
    title: "Six Sigma & Process Excellence",
    desc: "Eliminate waste and drive measurable quality improvements.",
  },
  {
    icon: Leaf,
    id: "04",
    title: "ESG Advisory",
    desc: "Embed sustainability into operations for long-term commercial value.",
  },
  {
    icon: TrendingUp,
    id: "05",
    title: "Procurement Strategy",
    desc: "Smarter purchasing decisions backed by data and industry insight.",
  },
  {
    icon: BarChart3,
    id: "06",
    title: "Logistics & Distribution",
    desc: "Optimize last-mile and network-wide delivery performance.",
  },
];

const clients = ["Tata Group", "Mahindra", "Reliance", "Wipro", "HUL", "ITC"];

const caseStudies = [
  {
    tag: "Supply Chain",
    title: "How we cut Mahindra's procurement cost by 31%",
    time: "6 month engagement",
  },
  {
    tag: "Six Sigma",
    title: "Reducing defect rate from 4.2% to 0.3% for a Pune manufacturer",
    time: "4 month engagement",
  },
  {
    tag: "ESG",
    title: "Building a carbon-neutral logistics framework for an FMCG giant",
    time: "8 month engagement",
  },
];

export default function Home() {
  return (
    <main style={{ width: "100%" }}>
      {/* Hero — asymmetric split */}
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--border)",
          paddingTop: "56px",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "80px 48px 80px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--accent-subtle)",
              border: "1px solid var(--accent)",
              borderRadius: "4px",
              padding: "4px 10px",
              marginBottom: "36px",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                fontFamily: "Geist Mono, monospace",
              }}
            >
              Operations Consulting
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            Operational
            <br />
            excellence,
            <br />
            <span
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              precisely
            </span>{" "}
            delivered.
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "440px",
              marginBottom: "40px",
              fontWeight: 400,
            }}
          >
            Crux partners with manufacturers, FMCG companies, and
            supply-chain-heavy enterprises to cut waste, accelerate procurement,
            and build resilient operations.
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                backgroundColor: "var(--accent)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Book a Consultation <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              to="/case-studies"
              style={{
                textDecoration: "none",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "10px 24px",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Case Studies
            </Link>
          </div>
        </div>

        {/* Right — stats panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "48px 40px",
                borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  marginBottom: "8px",
                  fontFamily: "Geist Mono, monospace",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  letterSpacing: "0.3px",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients strip */}
      <div
        style={{
          width: "100%",
          padding: "20px 32px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "32px",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-muted)",
            letterSpacing: "1px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            fontFamily: "Geist Mono, monospace",
          }}
        >
          Trusted by
        </span>
        <div
          style={{
            width: "1px",
            height: "20px",
            backgroundColor: "var(--border)",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {clients.map((c, i) => (
            <span
              key={i}
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "-0.2px",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Services grid */}
      <section
        style={{
          width: "100%",
          padding: "80px 32px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "48px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "Geist Mono, monospace",
                marginBottom: "12px",
              }}
            >
              What We Do
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Six practices.
              <br />
              One outcome.
            </h2>
          </div>
          <Link
            to="/services"
            style={{
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              border: "1px solid var(--border)",
              padding: "7px 14px",
              borderRadius: "6px",
              marginTop: "8px",
            }}
          >
            All Services <ChevronRight size={13} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            const isLastRow = i >= 3;
            const isLastCol = (i + 1) % 3 === 0;
            return (
              <div
                key={s.id}
                style={{
                  padding: "32px",
                  backgroundColor: "var(--card-bg)",
                  borderRight: !isLastCol ? "1px solid var(--border)" : "none",
                  borderBottom: !isLastRow ? "1px solid var(--border)" : "none",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--bg-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--card-bg)")
                }
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "var(--accent-subtle)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Icon size={16} color="var(--accent)" strokeWidth={2} />
                </div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    fontFamily: "Geist Mono, monospace",
                    marginBottom: "10px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {s.id}
                </p>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies preview */}
      <section
        style={{
          width: "100%",
          padding: "80px 32px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "40px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "Geist Mono, monospace",
                marginBottom: "12px",
              }}
            >
              Case Studies
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Results that speak.
            </h2>
          </div>
          <Link
            to="/case-studies"
            style={{
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              border: "1px solid var(--border)",
              padding: "7px 14px",
              borderRadius: "6px",
              marginTop: "8px",
            }}
          >
            View All <ChevronRight size={13} />
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {caseStudies.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 32px",
                borderBottom:
                  i < caseStudies.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                backgroundColor: "var(--card-bg)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--card-bg)")
              }
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--accent)",
                    backgroundColor: "var(--accent-subtle)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    fontFamily: "Geist Mono, monospace",
                  }}
                >
                  {c.tag}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {c.title}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    fontFamily: "Geist Mono, monospace",
                  }}
                >
                  {c.time}
                </span>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          width: "100%",
          padding: "100px 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "Geist Mono, monospace",
              marginBottom: "16px",
            }}
          >
            Get Started
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              color: "var(--text-primary)",
              lineHeight: 1.05,
            }}
          >
            Let's fix your
            <br />
            operations.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
            }}
          >
            Tell us where you're losing time, money, or efficiency. We'll scope
            a solution and get back within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                backgroundColor: "var(--accent)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Start the Conversation <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              to="/services"
              style={{
                textDecoration: "none",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "10px 24px",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
