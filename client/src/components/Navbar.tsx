import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(var(--bg-base-rgb), 0.85)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter flex items-baseline cursor-pointer"
          style={{ color: "var(--text-base)" }}
        >
          CRUX<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-10 text-[13px] font-bold tracking-[0.2em] uppercase">
          {[
            { name: "Services", path: "/services" },
            { name: "Industries", path: "/industries" },
            { name: "Work", path: "/case-studies" },
            { name: "Blog", path: "/blog" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text-base)" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="hover:opacity-50 cursor-pointer flex items-center justify-center w-10 h-10 transition-opacity"
            style={{ color: "var(--text-base)" }}
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {!user ? (
            <Link
              to="/auth"
              className="text-[13px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 border-b border-transparent hover:border-current cursor-pointer transition-all"
              style={{ color: "var(--text-base)" }}
            >
              Sign In
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="text-[13px] font-bold uppercase tracking-widest cursor-pointer border-b border-[color:var(--accent)] transition-all"
              style={{ color: "var(--accent)" }}
            >
              Portal
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
