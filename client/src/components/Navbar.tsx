import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: scrolled ? "var(--bg)" : "transparent",
    borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
    padding: "0 32px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "var(--accent)",
              borderRadius: "4px",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.3px",
            }}
          >
            Crux
          </span>
        </Link>

        {/* Center nav */}
        <div
          className="hide-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: "none",
                fontSize: "13.5px",
                fontWeight: 500,
                color:
                  location.pathname === link.path
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                padding: "5px 12px",
                borderRadius: "6px",
                backgroundColor:
                  location.pathname === link.path
                    ? "var(--bg-tertiary)"
                    : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
            }}
          >
            {theme === "dark" ? (
              <Sun size={14} strokeWidth={2} />
            ) : (
              <Moon size={14} strokeWidth={2} />
            )}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hide-mobile"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  padding: "5px 12px",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "5px 14px",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/contact"
                className="hide-mobile"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  padding: "5px 12px",
                }}
              >
                Contact
              </Link>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "var(--accent)",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Client Login <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </>
          )}

          <button
            className="show-mobile"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              width: "32px",
              height: "32px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "var(--bg)",
            borderTop: "1px solid var(--border)",
            padding: "16px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--text-primary)",
                padding: "10px 0",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
